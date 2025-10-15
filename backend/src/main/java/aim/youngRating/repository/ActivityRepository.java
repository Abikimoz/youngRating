package aim.youngRating.repository;

import aim.youngRating.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUserIdOrderByDateDesc(Long userId);
    List<Activity> findByUserIdAndStatus(Long userId, aim.youngRating.model.enums.ActivityStatus status);
}
