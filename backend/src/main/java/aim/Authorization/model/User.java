package aim.Authorization.model;

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

    @Column(nullable = false)
    private String role; // Роль пользователя (например, "user" или "admin")

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
} 