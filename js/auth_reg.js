// КОНСТАНТЫ И ПЕРЕМЕННЫЕ
// Форма регистрации
const REG_FORM = document.forms.reg_form;
// INPUT для e-mail
const REG_EMAIL = document.forms.reg_form.email
// Node List со всеми input элементами
const REG_INPUTS = REG_FORM.querySelectorAll('input');
// Node List с формами для ввода пароля
const REG_PASS_FORMS = REG_FORM.querySelectorAll('input[type=password]');
// Кнопка "submit" формы
const AUTH_SUBMIT_BTN = REG_FORM.querySelector('button');
// Текстовое поле для вывода уведомления
const AUTH_MESSAGE = document.getElementById('auth-message');
// ФЛАГ есть ли ошибки в форме
let is_submit_allow = false;
// END КОНСТАНТЫ И ПЕРЕМЕННЫЕ
//-------------------------------------------------------------------------------------------------
// ВЫПОЛНЯТЬ ЛБЩУЮ ПРОВЕРКУ ПРИ ПОТЕРЕ ФОКУСА КАЖДОГО ИЗ INPUT ЭЛЕМЕНТОВ
REG_INPUTS.forEach(input => input.onblur = reg_form_validity_check);
// END ВЫПОЛНЯТЬ ПРОВЕРКУ ПРИ ПОТЕРЕ ФОКУСА КАЖДОГО ИЗ INPUT ЭЛЕМЕНТОВ
//-------------------------------------------------------------------------------------------------
// ПРОВЕРКА СОВПАДЕНИЯ ПАРОЛЕЙ
// Функция для проверки совпадения паролей (без ожидания события)
function is_password_match() {
    // Возвращает true, если пароли совпадают, иначе false
    return (REG_PASS_FORMS[0].value == REG_PASS_FORMS[1].value) || false;
}
// END ПРОВЕРКА СОВПАДЕНИЯ ПАРОЛЕЙ
//-------------------------------------------------------------------------------------------------
// ПРОВЕРКА СУЩЕСТВОВАНИЯ EMAIL
// Функция с промисом для проверки сущесвования такого email в БД
async function is_email_exist() {
    const promise = new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest();
        XHR.open('post', '/server/ajax/is_email_exist.php');
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send('email=' + REG_EMAIL.value);
        XHR.onload = function () {
            if (XHR.status == 200) resolve((XHR.response != 0) || false);
            else reject('Не удалось проверить email');
        }
    })
    return await promise;
}
// END ПРОВЕРКА СУЩЕСТВОВАНИЯ EMAIL
//-------------------------------------------------------------------------------------------------
// ОБЩАЯ ПРОВЕРКА И ОТПРАВКА ДАННЫХ
// Функция для проверки всех условий валидации формы, true - всё хорошо, иначе false
function reg_form_validity_check() {
    // Проверка, что вся форма валидна
    if (!REG_FORM.checkValidity()) {
        is_submit_allow = false;
        return;
    }
    // // Проверка совпадения паролей
    if (!is_password_match()) {
        is_submit_allow = false;
        auth_error_message('Пароли не сопадают');
        return;
    } else auth_error_message();
    // Проверка не занят ли email (асинхронно)
    is_email_exist().then(result => {
        if (result) {
            auth_error_message(`E-mail уже используется`);
            is_submit_allow = false;
            return;
        } else {
            auth_error_message();
            is_submit_allow = true;
        }
    });
}
// END ОБЩАЯ ПРОВЕРКА И ОТПРАВКА ДАННЫХ
//-------------------------------------------------------------------------------------------------
// Функция для вывода сообщения об ошибке ввода данных в форму
function auth_error_message(text = '&nbsp') { AUTH_MESSAGE.innerHTML = text }
// ОТПРАВКА ДАННЫХ НА СЕРВЕР
REG_FORM.onsubmit = e => {
    e.preventDefault();
    if (is_submit_allow) {
        // Оъект для сбора данных с формы
        let sendData = new Object;
        // Наполение объекта данными
        REG_INPUTS.forEach(el => sendData[el.name] = el.value);
        sendData = JSON.stringify(sendData)
        // AJAX fetch, методом "POST"
        fetch('/server/ajax/reg.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: sendData
        }).then(response => response.json())
            .then(json => reg_complete(json))
            .catch(err => console.log(err));
        // Функция - регистрация выполнена
        function reg_complete(response) {
            // Запись данных пользователя в localStorage
            localStorage.setItem('user', JSON.stringify(response));
            // Заблокировать форму
            REG_INPUTS.forEach(input => input.setAttribute('disabled', ''));
            // Заблокировать кнопку
            AUTH_SUBMIT_BTN.setAttribute('disabled', '');
            auth_error_message('Загрука.');
            // Курсор "загрузка"
            // document.body.style.cursor = 'wait'
            // Редирект на главную
            let timer = 4;
            setInterval(() => {
                if (timer-- == 0) location.href = '/';
                else AUTH_MESSAGE.textContent += '.';



            }, 500);
        }
        // Функция регистрация завершена с ошибкой
    }
}
// END ОТПРАВКА ДАННЫХ НА СЕРВЕР
//-------------------------------------------------------------------------------------------------




