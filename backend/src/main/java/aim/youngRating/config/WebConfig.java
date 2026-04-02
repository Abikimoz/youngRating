package aim.youngRating.config;

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
                        .allowedOriginPatterns("http://localhost:3000", "http://localhost:3030", "https://d5dr7efq7f67tth60h5o.yl4tuxdu.apigw.yandexcloud.net", "http://10.*.*.*:*", "https://10.*.*.*:*")
                        .allowedMethods("*") // Разрешаем все HTTP-методы (GET, POST, PUT, DELETE, OPTIONS)
                        .allowCredentials(true); // Разрешаем передачу cookies и заголовков авторизации
            }
        };
    }
} 