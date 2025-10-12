import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser, getProfile } from "../api/auth";

export default function Admin() {
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileResult = await getProfile();
      if (profileResult.success) {
        setProfile(profileResult.profile);
        if (profileResult.profile.role === 'ADMIN') {
          const usersResult = await getAllUsers();
          if (usersResult.success) {
            setUsers(usersResult.users);
          } else {
            setError(usersResult.error);
          }
        }
      } else {
        setRedirectToLogin(true);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    if (result.success) {
      setUsers(users.filter((user) => user.id !== id));
    } else {
      setError(result.error);
    }
  };

  const renderCard = (title: string, content: React.ReactNode) => (
    <main className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#116fb7] rounded-3xl shadow-2xl overflow-hidden p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {title}
        </h2>
        {content}
      </div>
    </main>
  );

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return renderCard("Загрузка...", <div className="text-center text-gray-600">Пожалуйста, подождите...</div>);
  }

  if (!profile || profile.role !== 'ADMIN') {
    return renderCard("Доступ запрещен", (
        <div className="text-center text-red-600">
            У вас нет прав для просмотра этой страницы.
        </div>
    ));
  }

  if (error) {
    return renderCard("Ошибка", (
        <div className="text-red-600 text-sm text-center font-semibold p-2 bg-red-100 rounded-lg">
            {error}
        </div>
    ));
  }

  return renderCard("Панель администратора", (
    <div className="space-y-4">
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center bg-white/50 p-3 rounded-lg shadow">
            <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{user.email}</span>
                <span className="text-sm text-gray-600">{user.role}</span>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div className="pt-4">
        <button
            onClick={() => navigate(-1)}
            className="w-full bg-transparent hover:bg-blue-100 text-[#116fb7] font-bold py-2 px-4 border border-[#116fb7] rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
            Назад
        </button>
      </div>
    </div>
  ));
}
