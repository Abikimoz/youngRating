import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getRatingUsers } from "../api/auth";

// Компонент страницы рейтинга
export default function Rating() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getRatingUsers();
      if (result.success) {
        setUsers(result.users);
      } else {
        setError(result.error);
      }
    };

    fetchUsers();
  }, []);

  const renderCard = (title: string, content: React.ReactNode) => (
    <main className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-[#116fb7] rounded-3xl shadow-2xl overflow-hidden p-8 space-y-6">
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

  return renderCard("Рейтинг специалистов", (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
          <span className="font-semibold text-gray-700">{user.email}</span>
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{user.role}</span>
        </div>
      ))}
       <button
          onClick={() => navigate("/profile")}
          className="w-full bg-[#116fb7] hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-transform duration-200 transform hover:scale-105"
        >
          Назад в профиль
        </button>
    </div>
  ));
}
