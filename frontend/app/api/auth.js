// API для работы с аутентификацией и регистрацией
const API_BASE_URL = 'http://localhost:8080/api'; // Базовый URL для backend API

// Функция для регистрации нового пользователя
export async function register({ email, password, role = 'user' }) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST', // HTTP-метод
            headers: {
                'Content-Type': 'application/json', // Указываем, что отправляем JSON
            },
            body: JSON.stringify({ // Преобразуем объект в JSON-строку
                email,
                password,
                role
            })
        });

        if (response.ok) { // Если запрос успешен (статус 200-299)
            const user = await response.json(); // Парсим JSON-ответ
            return { success: true, user }; // Возвращаем успешный результат
        } else { // Если запрос неуспешен
            const errorMessage = await response.text(); // Получаем текст ошибки
            return { success: false, error: errorMessage }; // Возвращаем ошибку
        }
    } catch (error) { // Если произошла сетевая ошибка
        console.error('Ошибка при регистрации:', error); // Логируем ошибку
        return { success: false, error: 'Сетевая ошибка' }; // Возвращаем общую ошибку
    }
}

// Функция для логина пользователя (заготовка для будущего использования)
export async function login({ email, password }) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorMessage = await response.text();
            return { success: false, error: errorMessage };
        }
    } catch (error) {
        console.error('Ошибка при логине:', error);
        return { success: false, error: 'Сетевая ошибка' };
    }
}

// Функция для получения профиля пользователя (заготовка для будущего использования)
export async function getProfile() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const profile = await response.json();
            return { success: true, profile };
        } else {
            const errorMessage = await response.text();
            return { success: false, error: errorMessage };
        }
    } catch (error) {
        console.error('Ошибка при получении профиля:', error);
        return { success: false, error: 'Сетевая ошибка' };
    }
}

// Функция для получения всех пользователей (только для админов)
export async function getAllUsers() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const users = await response.json();
            return { success: true, users };
        } else {
            const errorMessage = await response.text();
            return { success: false, error: errorMessage };
        }
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        return { success: false, error: 'Сетевая ошибка' };
    }
}

// Функция для удаления пользователя (только для админов)
export async function deleteUser(id) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorMessage = await response.text();
            return { success: false, error: errorMessage };
        }
    } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
        return { success: false, error: 'Сетевая ошибка' };
    }
}

// Функция для получения пользователей для рейтинга
export async function getRatingUsers() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/rating/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const users = await response.json();
            return { success: true, users };
        } else {
            const errorMessage = await response.text();
            return { success: false, error: errorMessage };
        }
    } catch (error) {
        console.error('Ошибка при получении пользователей для рейтинга:', error);
        return { success: false, error: 'Сетевая ошибка' };
    }
} 