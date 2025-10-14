package aim.youngRating.controller;

import aim.youngRating.dto.ActivityDto;
import aim.youngRating.model.User;
import aim.youngRating.service.RatingService;
import aim.youngRating.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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
    public ResponseEntity<List<User>> getRatingUsers() {
        List<User> users = userService.findUsersForRating();
        return ResponseEntity.ok(users);
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
}
