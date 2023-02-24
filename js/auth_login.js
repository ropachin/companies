// КОНСТАНТЫ И ПЕРЕМЕННЫЕ
// форма авторизации
const LOGIN_FORM = document.forms.login_form;
// INPUT для email
const LOGIN_EMAIL = LOGIN_FORM.querySelector('input[type=email]');
// INPUT для пароля
const LOGIN_PASSWORD = LOGIN_FORM.querySelector('input[type=password]');
// Текстовое поле для вывода уведомления
const AUTH_MESSAGE = document.getElementById('auth-message');
// Текстовое поле для вывода таймера перед переадресацией
const LOGIN_TIMER = document.getElementById('login-timer');
// Отправка формы
LOGIN_FORM.onsubmit = e => {
    e.preventDefault();
    // AJAX
    const XHR = new XMLHttpRequest();
    XHR.open('post', '/server/ajax/login.php');
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send(`email=${LOGIN_EMAIL.value}&password=${LOGIN_PASSWORD.value}`);
    XHR.onload = function () {
        if (XHR.status == 200) {
            const RESPONSE_OBJ = JSON.parse(XHR.response);
            // Выполнить исходя из статуса
            switch (RESPONSE_OBJ.status) {
                case 400:
                    AUTH_MESSAGE.textContent = 'Неверные email или пароль';
                    break;
                case 200:
                    localStorage.setItem('user', JSON.stringify(RESPONSE_OBJ.data));
                    AUTH_MESSAGE.style.color = '#0f0';
                    AUTH_MESSAGE.textContent = 'Вы успешно вошли в систему';
                    LOGIN_FORM.querySelectorAll('input').forEach(input => input.setAttribute('disabled', ''));
                    let timer = 4
                    LOGIN_TIMER.textContent = 'Переадресация через ' + --timer;
                    setInterval(() => {
                        if (timer == 0) {
                            location.href = '/';
                            return;
                        }
                        LOGIN_TIMER.textContent = 'Переадресация через ' + --timer;
                    }, 1000);
                    break;
            }
        }
    }
}