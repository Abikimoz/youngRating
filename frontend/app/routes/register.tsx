// Импортируем необходимые хуки и функции из React и React Router
import React, { useState } from "react"; // useState для управления состоянием формы
import { useNavigate } from "react-router"; // useNavigate для программной навигации
import { register } from "../api/auth"; // Импортируем функцию регистрации из API

// Основной компонент страницы регистрации
export default function Register() {
  // Состояния для хранения введённых пользователем логина, пароля, подтверждения пароля и возможной ошибки
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Пароль
  const [confirmPassword, setConfirmPassword] = useState(""); // Подтверждение пароля
  const [error, setError] = useState(""); // Сообщение об ошибке
  const navigate = useNavigate(); // Хук для перехода между страницами

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    if (!email || !password || !confirmPassword) { // Проверяем, заполнены ли все поля
      setError("Пожалуйста, заполните все поля"); // Если нет — выводим ошибку
      return;
    }
    if (password !== confirmPassword) { // Проверяем совпадение паролей
      setError("Пароли не совпадают"); // Если не совпадают — выводим ошибку
      return;
    }
    setError(""); // Сбрасываем ошибку, если всё заполнено и пароли совпадают
    
    try {
      // Вызываем API-функцию регистрации
      const result = await register({ email, password, role: 'user' });
      if (result.success) {
        // Можно сделать редирект на страницу входа
        navigate('/login');
      } else {
        // Показываем ошибку от backend
        setError(result.error);
      }
    } catch (error) {
      // Обрабатываем неожиданные ошибки
      setError("Произошла ошибка при регистрации");
      console.error("Ошибка регистрации:", error);
    }
  };

  // Флаг для блокировки кнопки, если поля не заполнены или пароли не совпадают
  const isDisabled = !email || !password || !confirmPassword || password !== confirmPassword;

  // JSX-разметка страницы
  return (
    // Основной контейнер, центрирует форму по вертикали и горизонтали, задаёт фон
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Форма регистрации */}
      <form
        onSubmit={handleSubmit} // Обработчик отправки формы
        className={`shadow-lg rounded-xl px-8 pt-8 pb-10 mb-4 w-full max-w-sm border-2 transition-colors duration-200 bg-white dark:bg-gray-800 border-gray-300`}
      >
        {/* Заголовок формы */}
        <h2 className="mb-7 text-center text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow">
          Регистрация
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
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base transition-colors duration-200 ${error && !email ? "border-red-500" : "border-gray-400"}`}
            autoComplete="email" // автозаполнение email
            placeholder="Введите email" // плейсхолдер
          />
        </div>
        {/* Поле для ввода пароля */}
        <div className="mb-5">
          <label className="block text-gray-900 dark:text-gray-100 text-base font-bold mb-2" htmlFor="password">
            Пароль
          </label>
          <input
            id="password" // id для связи с label
            type="password" // тип поля — пароль
            value={password} // текущее значение из состояния
            onChange={e => setPassword(e.target.value)} // обновление состояния при изменении
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base transition-colors duration-200 ${error && !password ? "border-red-500" : "border-gray-400"}`}
            autoComplete="new-password" // автозаполнение пароля
            placeholder="Введите пароль" // плейсхолдер
          />
        </div>
        {/* Поле для подтверждения пароля */}
        <div className="mb-7">
          <label className="block text-gray-900 dark:text-gray-100 text-base font-bold mb-2" htmlFor="confirmPassword">
            Повторите пароль
          </label>
          <input
            id="confirmPassword" // id для связи с label
            type="password" // тип поля — пароль
            value={confirmPassword} // текущее значение из состояния
            onChange={e => setConfirmPassword(e.target.value)} // обновление состояния при изменении
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base transition-colors duration-200 ${error && !confirmPassword ? "border-red-500" : "border-gray-400"}`}
            autoComplete="new-password" // автозаполнение пароля
            placeholder="Повторите пароль" // плейсхолдер
          />
        </div>
        {/* Кнопка регистрации */}
        <button
          type="submit" // тип — submit, чтобы срабатывал onSubmit у формы
          disabled={isDisabled} // блокировка, если поля не заполнены или пароли не совпадают
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-lg shadow-md transition-colors duration-200 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Зарегистрироваться
        </button>
        {/* Кнопка возврата на страницу входа */}
        <button
          type="button" // тип — button, чтобы не отправлять форму
          className="mt-4 bg-gray-200 hover:bg-gray-400 text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg w-full text-lg shadow transition-colors transition-shadow duration-200"
          onClick={() => navigate('/login')} // переход на страницу входа
        >
          На страницу входа
        </button>
      </form>
    </main>
  );
} 