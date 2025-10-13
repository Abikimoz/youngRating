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
      navigate("/rating");
    } else {
      setError(result.error || "Ошибка входа");
    }
  };

  // JSX-разметка страницы
  return (
    <main className="w-full min-h-screen flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#116fb7] rounded-3xl shadow-2xl overflow-hidden p-8 space-y-6"
        noValidate
      >
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Авторизация
        </h2>

        {error && (
          <div className="text-red-600 text-sm text-center font-semibold p-2 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#116fb7] transition-colors duration-200 ${
              error && !email ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="email"
            placeholder="user@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600" htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#116fb7] transition-colors duration-200 ${
              error && !password ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button
            type="submit"
            className="w-full bg-[#116fb7] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
          >
            Войти
          </button>
          <button
            type="button"
            className="w-full bg-transparent hover:bg-blue-100 text-[#116fb7] font-bold py-2 px-4 border border-[#116fb7] rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            onClick={() => navigate('/register')}
          >
            Регистрация
          </button>
        </div>
      </form>
    </main>
  );
} 