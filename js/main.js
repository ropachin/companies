// Константы и переменные
const ONLY_GUEST = document.querySelectorAll('.only-guest-visible');
const ONLY_USER = document.querySelectorAll('.only-user-visible');
// Кнопка "Выйти" (разлогиниться)
const LOGOUT_BTN = document.getElementById('logout-btn');

// Удалить элементы для гостей / авторизованных пользователей
(localStorage.user)
    ? ONLY_GUEST.forEach(el => el.remove())
    : ONLY_USER.forEach(el => el.remove());

// Обьект с данными пользователя или пустой обьект
const USER = JSON.parse(localStorage.getItem('user')) ?? new Object;

// Разлогиниться при нажатии на кнопку
LOGOUT_BTN.onclick = function () {
    localStorage.removeItem('user');
    location.reload();
}

// Класс показать уведомление
class notification{
    
}