// Константы и переменные
// List элементов только для неавторизованных пользователей
const ONLY_GUEST = document.querySelectorAll('.only-guest-visible');
// List элементов только для авторизованных пользователей
const ONLY_USER = document.querySelectorAll('.only-user-visible');
// Кнопка меню для мобильного
const MOBILE_MENU_BTN = document.getElementById('mobile-menu-icon');
// Меню nav
const MAIN_NAV = document.getElementById('main-nav');
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

// Мобильное меню
let mobileMenuFlag = false;
MOBILE_MENU_BTN.onclick = function () {
    if (!mobileMenuFlag) {
        // Опустить меню
        MAIN_NAV.style.transform = 'translateY(0)';
        // Стиль зажатой кнопки
        MOBILE_MENU_BTN.style.filter = 'grayscale(1) brightness(0.5)';
        // Переключить флаг
        mobileMenuFlag = true;
        // Закрыть при щелчке ниже чем меню
        document.onclick = e => {
            if (e.y > MAIN_NAV.clientHeight) {
                MAIN_NAV.style.cssText = 'revert';
                mobileMenuFlag = false;
            }
        }
    }
    else {
        // Поднять меню
        MAIN_NAV.style.cssText = 'revert';
        // Убрать стиль зажатой кнопки
        MOBILE_MENU_BTN.style.filter = "none";
        // Переключить флаг
        mobileMenuFlag = false;
    }
}