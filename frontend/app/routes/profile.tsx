import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getProfile, getMyActivities } from "../api/auth";

// Компонент страницы профиля
export default function Profile() {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndActivities = async () => {
      const profileResult = await getProfile();
      if (profileResult.success) {
        setUser(profileResult.profile);
      } else {
        setError(profileResult.error);
        navigate("/login");
        return;
      }

      const activitiesResult = await getMyActivities();
      if (activitiesResult.success) {
        setActivities(activitiesResult.activities);
      } else {
        // Можно установить отдельную ошибку для мероприятий, если нужно
        console.error(activitiesResult.error);
      }
    };

    fetchProfileAndActivities();
  }, [navigate]);

  // Функция для рендера основной карточки страницы
  const renderCard = (title: string, content: React.ReactNode) => (
    <main className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto bg-white border-2 border-gray-200 rounded-3xl shadow-lg overflow-hidden p-6 sm:p-8 space-y-6">
        <h2 className="text-center text-4xl font-bold text-gray-800">
          {title}
        </h2>
        {content}
      </div>
    </main>
  );

  if (error) {
    return renderCard("Ошибка", (
      <div className="text-red-600 text-center font-semibold p-3 bg-red-100 rounded-lg">
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
      <div className="space-y-4 text-gray-700 text-lg p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between border-b pb-2">
          <span className="font-bold">ФИО:</span>
          <span className="text-right">{user.fullName || 'Не указано'}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-bold">Email:</span>
          <span className="text-right">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Роль:</span>
          <span className="text-right font-semibold">{user.role}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Мои мероприятия</h3>
        {activities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Название</th>
                  <th className="py-2 px-4 border-b">Дата</th>
                  <th className="py-2 px-4 border-b">Баллы</th>
                  <th className="py-2 px-4 border-b">Статус</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{activity.name}</td>
                    <td className="py-2 px-4 border-b">{new Date(activity.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{activity.points}</td>
                    <td className="py-2 px-4 border-b">{activity.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">У вас пока нет добавленных мероприятий.</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 pt-6">
        {user.role === 'ADMIN' && (
          <button
            onClick={() => navigate("/admin")}
            className="w-full max-w-xs bg-[#116fb7] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
          >
            Панель администратора
          </button>
        )}
        <button
          onClick={() => navigate("/rating")}
          className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
        >
          Рейтинг
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
        >
          Выйти
        </button>
      </div>
    </>
  ));
}