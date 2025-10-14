package aim.youngRating.service;

import aim.youngRating.dto.ActivityDto;
import aim.youngRating.model.Activity;
import aim.youngRating.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    private final ActivityRepository activityRepository;

    @Autowired
    public RatingService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getActivitiesByUserId(Long userId) {
        return activityRepository.findByUserIdOrderByDateDesc(userId);
    }

    public ActivityDto convertToDto(Activity activity) {
        return new ActivityDto(
                activity.getId(),
                activity.getName(),
                activity.getDate(),
                activity.getPoints(),
                activity.getStatus(),
                activity.getCategory(),
                activity.getDocumentUrl()
        );
    }
}
