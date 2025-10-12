import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getProfile } from "../api/auth";

// Компонент страницы профиля
export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      if (result.success) {
        setUser(result.profile);
      } else {
        setError(result.error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="shadow-lg rounded-xl px-8 pt-8 pb-10 mb-4 w-full max-w-sm border-2 bg-white dark:bg-gray-800 border-gray-300">
          <h2 className="mb-7 text-center text-3xl font-extrabold text-red-600 dark:text-red-500 drop-shadow">
            Ошибка
          </h2>
          <div className="mb-5 text-lg text-gray-900 dark:text-gray-100">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="shadow-lg rounded-xl px-8 pt-8 pb-10 mb-4 w-full max-w-sm border-2 bg-white dark:bg-gray-800 border-gray-300">
          <h2 className="mb-7 text-center text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow">
            Загрузка...
          </h2>
        </div>
      </main>
    );
  }

  return (
    // Основной контейнер страницы
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Карточка профиля */}
      <div className="shadow-lg rounded-xl px-8 pt-8 pb-10 mb-4 w-full max-w-sm border-2 bg-white dark:bg-gray-800 border-gray-300">
        {/* Заголовок */}
        <h2 className="mb-7 text-center text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow">
          О профиле
        </h2>
        {/* Информация о пользователе */}
        <div className="mb-5 text-lg text-gray-900 dark:text-gray-100">
          <div><span className="font-bold">Емейл:</span> {user.email}</div>
          <div><span className="font-bold">Роль:</span> {user.role}</div>
        </div>
        {user.role === 'ADMIN' && (
          <button
            onClick={() => navigate("/admin")}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out mb-4"
          >
            Админ панель
          </button>
        )}
        {/* Кнопка выхода */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Выйти
        </button>
      </div>
    </main>
  );
} 