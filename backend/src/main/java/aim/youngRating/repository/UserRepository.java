package aim.youngRating.repository;

import aim.youngRating.model.User; // Импортируем сущность User
import aim.youngRating.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository; // Импортируем JpaRepository

import java.util.List;
import java.util.Optional; // Для возвращения Optional

// Интерфейс репозитория для работы с пользователями
public interface UserRepository extends JpaRepository<User, Long> { // Наследуем JpaRepository для сущности User и типа ключа Long
    Optional<User> findByEmail(String email); // Метод поиска пользователя по email (возвращает Optional)
    boolean existsByEmail(String email); // Метод проверки существования пользователя по email

    List<User> findByRoleNotOrderByScoreDesc(Role role);
} 