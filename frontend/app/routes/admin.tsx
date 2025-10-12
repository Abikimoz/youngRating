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

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  if (loading) {
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

  if (!profile || profile.role !== 'ADMIN') {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="shadow-lg rounded-xl px-8 pt-8 pb-10 mb-4 w-full max-w-sm border-2 bg-white dark:bg-gray-800 border-gray-300">
          <h2 className="mb-7 text-center text-3xl font-extrabold text-red-600 dark:text-red-500 drop-shadow">
            Доступ запрещен
          </h2>
          <div className="mb-5 text-lg text-gray-900 dark:text-gray-100">
            У вас нет прав для просмотра этой страницы. Ваша роль: {profile?.role}
          </div>
        </div>
      </main>
    );
  }

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

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="shadow-lg rounded-xl px-8 pt-8 pb-10 mb-4 w-full max-w-md border-2 bg-white dark:bg-gray-800 border-gray-300">
        <h2 className="mb-7 text-center text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow">
          Панель администратора
        </h2>
        <div className="mb-5 text-lg text-gray-900 dark:text-gray-100">
          <ul>
            {users.map((user) => (
              <li key={user.id} className="flex justify-between items-center mb-2">
                <span>{user.email} ({user.role})</span>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Назад
        </button>
      </div>
    </main>
  );
}
