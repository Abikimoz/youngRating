package aim.Authorization.config;

import org.springframework.context.annotation.Bean; // Для создания бина
import org.springframework.context.annotation.Configuration; // Для пометки класса как конфигурационного
import org.springframework.web.servlet.config.annotation.CorsRegistry; // Для настройки CORS
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // Интерфейс для настройки Web MVC

// Конфигурационный класс для настройки CORS
@Configuration // Помечаем класс как конфигурацию Spring
public class WebConfig {
    
    // Создаём бин для настройки CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Применяем CORS ко всем маршрутам
                        .allowedOrigins("http://localhost:3000") // Разрешаем запросы с frontend
                        .allowedMethods("*") // Разрешаем все HTTP-методы (GET, POST, PUT, DELETE, OPTIONS)
                        .allowCredentials(true); // Разрешаем передачу cookies и заголовков авторизации
            }
        };
    }
} 