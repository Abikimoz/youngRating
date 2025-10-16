package aim.youngRating.dto;

import aim.youngRating.model.enums.ActivityCategory;

import java.time.LocalDate;

public class ActivityRequest {
    private String name;
    private String description;
    private LocalDate date;
    private ActivityCategory category;
    private String documentUrl; // For now, we'll just pass the URL. File upload can be a future improvement.

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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
}