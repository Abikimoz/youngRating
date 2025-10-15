package aim.youngRating.dto;

public class UserRatingDto {
    private Long id;
    private String fullName;
    private int score;

    public UserRatingDto(Long id, String fullName, int score) {
        this.id = id;
        this.fullName = fullName;
        this.score = score;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
