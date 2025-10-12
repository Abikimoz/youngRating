package aim.Authorization.dto;

// DTO для передачи данных при регистрации пользователя
public class RegisterRequest {
    public String email; // Email
    public String password; // Пароль
    public String role;     // Роль (например, "user")
}
