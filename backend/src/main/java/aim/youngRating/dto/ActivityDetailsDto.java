package aim.youngRating.dto;

import java.util.List;

public class ActivityDetailsDto {
    private String name;
    private List<Integer> points;

    public ActivityDetailsDto(String name, List<Integer> points) {
        this.name = name;
        this.points = points;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getPoints() {
        return points;
    }

    public void setPoints(List<Integer> points) {
        this.points = points;
    }
}
