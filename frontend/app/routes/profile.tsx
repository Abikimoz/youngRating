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

  const renderCard = (title: string, content: React.ReactNode) => (
    <main className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#116fb7] rounded-3xl shadow-2xl overflow-hidden p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {title}
        </h2>
        {content}
      </div>
    </main>
  );

  if (error) {
    return renderCard("Ошибка", (
      <div className="text-red-600 text-sm text-center font-semibold p-2 bg-red-100 rounded-lg">
        {error}
      </div>
    ));
  }

  if (!user) {
    return renderCard("Загрузка...", (
        <div className="text-center text-gray-600">
            Пожалуйста, подождите...
        </div>
    ));
  }

  return renderCard("Профиль", (
    <>
      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span className="font-bold">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Роль:</span>
          <span>{user.role}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        {user.role === 'ADMIN' && (
          <button
            onClick={() => navigate("/admin")}
            className="w-full bg-[#116fb7] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
          >
            Админ панель
          </button>
        )}
        <button
          onClick={() => navigate("/rating")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
        >
          Рейтинг
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
        >
          Выйти
        </button>
      </div>
    </>
  ));
} 