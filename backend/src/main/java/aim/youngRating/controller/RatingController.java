package aim.youngRating.controller;

import aim.youngRating.dto.ActivityDetailsDto;
import aim.youngRating.dto.ActivityDto;
import aim.youngRating.dto.ActivityRequest;
import aim.youngRating.dto.UserRatingDto;
import aim.youngRating.model.Activity;
import aim.youngRating.model.User;
import aim.youngRating.model.enums.ActivityCategory;
import aim.youngRating.model.enums.ActivityStatus;
import aim.youngRating.service.RatingService;
import aim.youngRating.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rating")
public class RatingController {

    private final UserService userService;
    private final RatingService ratingService;

    @Autowired
    public RatingController(UserService userService, RatingService ratingService) {
        this.userService = userService;
        this.ratingService = ratingService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserRatingDto>> getRatingUsers() {
        List<User> users = userService.findUsersForRating();
        List<UserRatingDto> userRatingDtos = users.stream()
                .map(user -> {
                    // Для каждого пользователя получаем список его активностей
                    List<Activity> activities = ratingService.getActivitiesByUserId(user.getId());

                    // Получаем все подтвержденные активности
                    List<Activity> approvedActivities = activities.stream()
                            .filter(activity -> activity.getStatus() == ActivityStatus.APPROVED)
                            .collect(Collectors.toList());

                    // Считаем баллы для категории SPORT с ограничением в 400
                    int sportScore = approvedActivities.stream()
                            .filter(activity -> activity.getCategory() == ActivityCategory.SPORT)
                            .mapToInt(Activity::getPoints)
                            .sum();
                    if (sportScore > 400) {
                        sportScore = 400;
                    }

                    // Считаем баллы для остальных категорий
                    int otherScore = approvedActivities.stream()
                            .filter(activity -> activity.getCategory() != ActivityCategory.SPORT)
                            .mapToInt(Activity::getPoints)
                            .sum();

                    // Общий рейтинг - это сумма баллов по всем категориям
                    int score = sportScore + otherScore;
                    return new UserRatingDto(user.getId(), user.getFullName(), score);
                })
                .sorted(Comparator.comparingInt(UserRatingDto::getScore).reversed())
                .collect(Collectors.toList());
        return ResponseEntity.ok(userRatingDtos);
    }

    @GetMapping("/my-activities")
    public ResponseEntity<List<ActivityDto>> getMyActivities() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userService.getUserByEmail(currentUserName);

        List<ActivityDto> activities = ratingService.getActivitiesByUserId(currentUser.getId())
                .stream()
                .map(ratingService::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(activities);
    }

    @PostMapping("/activities")
    public ResponseEntity<ActivityDto> createActivity(@RequestBody ActivityRequest activityRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User currentUser = userService.getUserByEmail(currentUserName);

        Activity createdActivity = ratingService.createActivity(activityRequest, currentUser);
        return new ResponseEntity<>(ratingService.convertToDto(createdActivity), HttpStatus.CREATED);
    }

    @GetMapping("/activity-details")
    public ResponseEntity<Map<ActivityCategory, List<ActivityDetailsDto>>> getActivityDetails() {
        return ResponseEntity.ok(ratingService.getActivityDetails());
    }
}