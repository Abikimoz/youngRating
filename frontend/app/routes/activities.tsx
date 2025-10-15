import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllActivities, approveActivity, rejectActivity } from "../api/auth";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categoryTranslations = {
    SCIENTIFIC: 'Научная и рационализаторская деятельность',
    SPORT: 'Спортивная деятельность',
    SOCIAL: 'Социальная, культурно-массовая и информационная деятельность',
    ORGANIZATIONAL: 'Организационная деятельность',
  };

  const statusTranslations = {
    PENDING: 'На рассмотрении',
    APPROVED: 'Одобрено',
    REJECTED: 'Отклонено',
  };

  const fetchActivities = async () => {
    const result = await getAllActivities();
    if (result.success) {
      setActivities(result.activities);
    } else {
      setError(result.error || "Не удалось загрузить мероприятия");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleApprove = async (activityId) => {
    const points = prompt("Введите количество баллов:");
    if (points) {
      const result = await approveActivity(activityId, parseInt(points, 10));
      if (result.success) {
        fetchActivities();
      } else {
        setError(result.error || "Не удалось одобрить мероприятие");
      }
    }
  };

  const handleReject = async (activityId) => {
    const result = await rejectActivity(activityId);
    if (result.success) {
      fetchActivities();
    } else {
      setError(result.error || "Не удалось отклонить мероприятие");
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-full mx-auto bg-white border-2 border-gray-200 rounded-3xl shadow-lg overflow-hidden p-6 sm:p-8 space-y-6">
        <h2 className="text-center text-4xl font-bold text-gray-800">
          Управление мероприятиями
        </h2>
        {error && (
          <div className="text-red-600 text-center font-semibold p-3 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {activities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">№</th>
                  <th className="py-2 px-4 border-b">Направление</th>
                  <th className="py-2 px-4 border-b">Название</th>
                  <th className="py-2 px-4 border-b">Дата</th>
                  <th className="py-2 px-4 border-b">Пользователь</th>
                  <th className="py-2 px-4 border-b">Баллы</th>
                  <th className="py-2 px-4 border-b">Статус</th>
                  <th className="py-2 px-4 border-b">Действия</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{categoryTranslations[activity.category] || activity.category}</td>
                    <td className="py-2 px-4 border-b">{activity.name}</td>
                    <td className="py-2 px-4 border-b">{new Date(activity.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{activity.user.fullName}</td>
                    <td className="py-2 px-4 border-b">{activity.points}</td>
                    <td className="py-2 px-4 border-b">{statusTranslations[activity.status] || activity.status}</td>
                    <td className="py-2 px-4 border-b">
                      {activity.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <button onClick={() => handleApprove(activity.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">
                            Одобрить
                          </button>
                          <button onClick={() => handleReject(activity.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                            Отклонить
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Нет мероприятий для управления.</p>
        )}
        <div className="pt-4 flex gap-4">
            <button
                onClick={() => navigate(-1)}
                className="w-full bg-transparent hover:bg-blue-100 text-[#116fb7] font-bold py-2 px-4 border border-[#116fb7] rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
                Назад
            </button>
        </div>
      </div>
    </main>
  );
}
