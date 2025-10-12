// Импортируем необходимые хуки и функции из React и React Router
import React, { useState } from "react"; // useState для управления состоянием формы
import { useNavigate } from "react-router"; // useNavigate для программной навигации
import { login } from "../api/auth"; // Импортируем функцию login

// Основной компонент страницы входа
export default function Login() {
  // Состояния для хранения введённых пользователем логина, пароля и возможной ошибки
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Пароль
  const [error, setError] = useState(""); // Сообщение об ошибке
  const navigate = useNavigate(); // Хук для перехода между страницами

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    if (!email || !password) { // Проверяем, заполнены ли оба поля
      setError("Пожалуйста, заполните все поля"); // Если нет — выводим ошибку
      return;
    }
    setError(""); // Сбрасываем ошибку, если всё заполнено

    const result = await login({ email, password });

    if (result.success) {
      localStorage.setItem("token", result.data.token);
      navigate("/profile");
    } else {
      setError(result.error || "Ошибка входа");
    }
  };

  // JSX-разметка страницы
  return (
    // Основной контейнер, центрирует форму по вертикали и горизонтали, задаёт фон
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Форма авторизации */}
      <form
        onSubmit={handleSubmit} // Обработчик отправки формы
        className={`shadow-lg rounded-xl px-8 pt-8 pb-10 mb-4 w-full max-w-sm border-2 transition-colors duration-200
          ${error ? "border-red-500 bg-white/95 dark:bg-gray-800/95" : "border-gray-300 bg-white dark:bg-gray-800"}`}
      >
        {/* Заголовок формы */}
        <h2 className="mb-7 text-center text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow">
          Авторизация
        </h2>
        {/* Блок для вывода ошибки, если она есть */}
        {error && (
          <div className="mb-5 text-red-600 text-base text-center font-semibold">
            {error}
          </div>
        )}
        {/* Поле для ввода email */}
        <div className="mb-5">
          <label className="block text-gray-900 dark:text-gray-100 text-base font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email" // id для связи с label
            type="email" // тип поля — email
            value={email} // текущее значение из состояния
            onChange={e => setEmail(e.target.value)} // обновление состояния при изменении
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base transition-colors duration-200
              ${error && !email ? "border-red-500" : "border-gray-400"}`}
            autoComplete="email" // автозаполнение email
            placeholder="Введите email" // плейсхолдер
          />
        </div>
        {/* Поле для ввода пароля */}
        <div className="mb-7">
          <label className="block text-gray-900 dark:text-gray-100 text-base font-bold mb-2" htmlFor="password">
            Пароль
          </label>
          <input
            id="password" // id для связи с label
            type="password" // тип поля — пароль
            value={password} // текущее значение из состояния
            onChange={e => setPassword(e.target.value)} // обновление состояния при изменении
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base transition-colors duration-200
              ${error && !password ? "border-red-500" : "border-gray-400"}`}
            autoComplete="current-password" // автозаполнение пароля
            placeholder="Введите пароль" // плейсхолдер
          />
        </div>
        {/* Кнопки управления: Войти и Регистрация */}
        <div className="flex flex-col gap-3 items-center justify-between">
          {/* Кнопка входа */}
          <button
            type="submit" // тип — submit, чтобы срабатывал onSubmit у формы
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-lg shadow-md transition-colors duration-200"
          >
            Войти
          </button>
          {/* Кнопка перехода на регистрацию */}
          <button
            type="button" // тип — button, чтобы не отправлять форму
            className="bg-gray-200 hover:bg-gray-400 text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg w-full text-lg shadow transition-colors transition-shadow duration-200"
            onClick={() => navigate('/register')} // переход на страницу регистрации
          >
            Регистрация
          </button>
        </div>
      </form>
    </main>
  );
} 