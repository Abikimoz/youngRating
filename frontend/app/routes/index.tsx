// Импортируем необходимые хуки из React и React Router
import { useEffect } from "react"; // useEffect для выполнения эффекта после монтирования
import { useNavigate } from "react-router"; // useNavigate для программной навигации

// Компонент для редиректа с / на /login
export default function IndexRedirect() {
  const navigate = useNavigate(); // Получаем функцию навигации
  useEffect(() => {
    navigate("/login", { replace: true }); // При монтировании компонента выполняем редирект на /login
  }, [navigate]); // Эффект зависит только от функции navigate
  return null; // Компонент ничего не рендерит
} 