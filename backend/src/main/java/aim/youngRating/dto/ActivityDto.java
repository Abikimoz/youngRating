package aim.youngRating.dto;

import aim.youngRating.model.enums.ActivityCategory;
import aim.youngRating.model.enums.ActivityStatus;

import java.time.LocalDate;

public class ActivityDto {
    private Long id;
    private String name;
    private LocalDate date;
    private Integer points;
    private ActivityStatus status;
    private ActivityCategory category;
    private String documentUrl;
    private UserDto user;

    public ActivityDto(Long id, String name, LocalDate date, Integer points, ActivityStatus status, ActivityCategory category, String documentUrl, UserDto user) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.points = points;
        this.status = status;
        this.category = category;
        this.documentUrl = documentUrl;
        this.user = user;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public ActivityStatus getStatus() {
        return status;
    }

    public void setStatus(ActivityStatus status) {
        this.status = status;
    }

    public ActivityCategory getCategory() {
        return category;
    }

    public void setCategory(ActivityCategory category) {
        this.category = category;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
