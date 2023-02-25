// Константы и переменные
// List элементов только для неавторизованных пользователей
const ONLY_GUEST = document.querySelectorAll('.only-guest-visible');
// List элементов только для авторизованных пользователей
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

// Функция - показать уведомление
function notification(text) {
    if (document.getElementById('main-notification')) return;
    const BLOCK = document.createElement('div');
    const LINE = document.createElement('div');
    const SPAN = document.createElement('span');
    BLOCK.setAttribute('id', 'main-notification');
    SPAN.textContent = text;
    BLOCK.append(LINE, SPAN);
    document.body.append(BLOCK);
    setTimeout(() => LINE.style.transform = 'none', 1);
    LINE.ontransitionend = () => BLOCK.style.transform = 'translateY(100%)';
    BLOCK.ontransitionend = () => setTimeout(() => BLOCK.remove(), 999);
}