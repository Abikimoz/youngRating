package aim.youngRating.model;

import aim.youngRating.model.enums.Role;
import jakarta.persistence.*;

// Сущность пользователя для хранения в БД
@Entity // Помечает класс как JPA-сущность
@Table(name = "users") // Имя таблицы в БД
public class User {
    @Id // Первичный ключ
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Автоинкремент
    private Long id;

    @Column(nullable = false, unique = true)
    private String email; // Email пользователя

    @Column(nullable = false)
    private String password; // Хэш пароля

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // Роль пользователя (например, "user" или "admin")

    @Column(name = "full_name")
    private String fullName;

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}