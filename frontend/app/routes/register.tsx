// Импортируем необходимые хуки и функции из React и React Router
import React, { useState } from "react"; // useState для управления состоянием формы
import { useNavigate } from "react-router"; // useNavigate для программной навигации
import { register } from "../api/auth"; // Импортируем функцию регистрации из API

// Основной компонент страницы регистрации
export default function Register() {
  // Состояния для хранения введённых пользователем данных
  const [email, setEmail] = useState(""); // Email
  const [fullName, setFullName] = useState(""); // ФИО
  const [password, setPassword] = useState(""); // Пароль
  const [confirmPassword, setConfirmPassword] = useState(""); // Подтверждение пароля
  const [error, setError] = useState(""); // Сообщение об ошибке
  const navigate = useNavigate(); // Хук для перехода между страницами

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    if (!email || !password || !confirmPassword || !fullName) { // Проверяем, заполнены ли все поля
      setError("Пожалуйста, заполните все поля");
      return;
    }
    if (password !== confirmPassword) { // Проверяем совпадение паролей
      setError("Пароли не совпадают");
      return;
    }
    setError(""); // Сбрасываем ошибку
    
    try {
      // Вызываем API-функцию регистрации с полным именем
      const result = await register({ email, password, fullName, role: 'user' });
      if (result.success) {
        navigate('/login'); // Перенаправляем на страницу входа
      } else {
        setError(result.error || "Ошибка регистрации");
      }
    } catch (error) {
      setError("Произошла ошибка при регистрации");
      console.error("Ошибка регистрации:", error);
    }
  };

  // Флаг для блокировки кнопки
  const isDisabled = !email || !password || !confirmPassword || !fullName || password !== confirmPassword;

  // JSX-разметка страницы
  return (
    <main className="w-full min-h-screen flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#116fb7] rounded-3xl shadow-2xl overflow-hidden p-8 space-y-4"
        noValidate
      >
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Регистрация
        </h2>

        {error && (
          <div className="text-red-600 text-sm text-center font-semibold p-2 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600" htmlFor="fullName">
            ФИО
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#116fb7] transition-colors duration-200 ${
              error && !fullName ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="name"
            placeholder="Иванов Иван Иванович"
          />
        </div>

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
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600" htmlFor="confirmPassword">
            Повторите пароль
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#116fb7] transition-colors duration-200 ${
              error && !confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full bg-[#116fb7] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-all duration-200 transform hover:scale-105 ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            Зарегистрироваться
          </button>
          <button
            type="button"
            className="w-full bg-transparent hover:bg-blue-100 text-[#116fb7] font-bold py-2 px-4 border border-[#116fb7] rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            onClick={() => navigate('/login')}
          >
            На страницу входа
          </button>
        </div>
      </form>
    </main>
  );
}