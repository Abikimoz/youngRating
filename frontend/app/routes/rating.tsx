import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getRatingUsers } from "../api/auth";

// Определяем тип для объекта пользователя для лучшей типизации
type User = {
  id: number;
  fullName: string;
  score: number;
};

// Компонент страницы рейтинга
export default function Rating() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getRatingUsers();
      if (result.success) {
        // Предполагаем, что API возвращает пользователей, отсортированных по score
        setUsers(result.users);
      } else {
        setError(result.error || "Не удалось загрузить рейтинг");
      }
    };

    fetchUsers();
  }, []);

  const renderCard = (title: string, content: React.ReactNode) => (
    <main className="w-full min-h-screen flex justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white border-2 border-gray-200 rounded-3xl shadow-lg overflow-hidden p-8 space-y-6">
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

  return renderCard("Рейтинг молодых специалистов", (
    <div className="flow-root">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            {/* Заголовок таблицы */}
            <div className="min-w-full flex bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="w-1/6 font-bold">№ Места</div>
              <div className="w-3/6 font-bold">ФИО</div>
              <div className="w-2/6 font-bold text-right">Общий балл</div>
            </div>
            {/* Тело таблицы */}
            <div className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <div key={user.id} className="flex items-center px-6 py-4 whitespace-nowrap">
                    <div className="w-1/6 text-lg font-semibold text-gray-700">{index + 1}</div>
                    <div className="w-3/6 text-sm font-medium text-gray-900 truncate">{user.fullName}</div>
                    <div className="w-2/6 text-lg font-semibold text-gray-800 text-right">{user.score}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Рейтинг пока пуст.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
       <button
          onClick={() => navigate("/profile")}
          className="w-full mt-6 bg-[#116fb7] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
        >
          Перейти в профиль
        </button>
    </div>
  ));
}