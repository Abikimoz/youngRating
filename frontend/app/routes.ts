// Импортируем типы и функцию index для описания маршрутов
import { type RouteConfig, index } from "@react-router/dev/routes";

// Описываем маршруты приложения
export default [
  index("routes/index.tsx"), // Индексный маршрут (/) — редирект на /login
  { path: "login", file: "routes/login.tsx" }, // Маршрут для страницы входа
  { path: "register", file: "routes/register.tsx" }, // Маршрут для страницы регистрации
  { path: "profile", file: "routes/profile.tsx" }, // Маршрут для страницы профиля
  { path: "admin", file: "routes/admin.tsx" }, // Маршрут для страницы администратора
  { path: "rating", file: "routes/rating.tsx" }, // Маршру-т для страницы рейтинга
  { path: "activities", file: "routes/activities.tsx" }, // Маршрут для страницы управления мероприятиями
] satisfies RouteConfig; // Проверка соответствия типу RouteConfig
