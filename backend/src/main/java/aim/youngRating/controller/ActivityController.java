package aim.youngRating.controller;

import aim.youngRating.model.Activity;
import aim.youngRating.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final RatingService ratingService;

    @Autowired
    public ActivityController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<aim.youngRating.dto.ActivityDto>> getAllActivities() {
        List<Activity> activities = ratingService.getAllActivities();
        List<aim.youngRating.dto.ActivityDto> activityDtos = activities.stream()
                .map(ratingService::convertToDto)
                .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(activityDtos);
    }

    @PutMapping("/{activityId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Activity> rejectActivity(@PathVariable Long activityId) {
        Activity rejectedActivity = ratingService.rejectActivity(activityId);
        return ResponseEntity.ok(rejectedActivity);
    }

    @PutMapping("/{activityId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Activity> approveActivity(@PathVariable Long activityId, @RequestParam int points) {
        Activity approvedActivity = ratingService.approveActivity(activityId, points);
        return ResponseEntity.ok(approvedActivity);
    }
}
