package aim.Authorization.repository;

import aim.Authorization.model.User; // Импортируем сущность User
import org.springframework.data.jpa.repository.JpaRepository; // Импортируем JpaRepository
import java.util.Optional; // Для возвращения Optional

// Интерфейс репозитория для работы с пользователями
public interface UserRepository extends JpaRepository<User, Long> { // Наследуем JpaRepository для сущности User и типа ключа Long
    Optional<User> findByEmail(String email); // Метод поиска пользователя по email (возвращает Optional)
    boolean existsByEmail(String email); // Метод проверки существования пользователя по email
} 