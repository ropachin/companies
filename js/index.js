// КЛАССЫ
// Класс для подключения внешних html документов и их внедрения в DOM сайта
class loadHTML {
    frame;
    async load(url) {
        // Читаем файл с помощью fetch
        const RESPONSE = await fetch(url);
        // Создаём пустой блок
        this.frame = document.createElement('div');
        // Наполняем этот блок html кодом из файла
        this.frame.innerHTML = await RESPONSE.text();
        // Добавляем блок в DOM, в конец body
        document.body.append(this.frame);
    }
    // Метод "Удалить блок"
    close() {
        this.frame.remove();
    }
}
// Класс для создания карточек компаний в списке (принимает response обьект с данными компании с сервера)
class CompanyCard {
    // Свойсва класса (используемые данные компании)
    id; name; TIN; info; CEO; address; tel;
    // Конструктор принимает полученный с сервера обьект компании
    constructor(responseObj) {
        this.id = responseObj.id;
        this.name = responseObj.name;
        this.TIN = responseObj.TIN;
        this.info = responseObj.info;
        this.CEO = responseObj.CEO;
        this.address = responseObj.address;
        this.tel = responseObj.tel;
        this.owner = responseObj.owner;
    }
    // Метод для построения и внедрения полученных данных в DOM страницы (принимает родителя для будущих карточек компаний)
    add(PARENT) {
        // Создать HTML елементы
        const CARD = document.createElement('div');
        const NAME = document.createElement('p');
        const HR = document.createElement('hr');
        const TIN = document.createElement('p');
        const ADDRESS = document.createElement('p');
        const TEL = document.createElement('p');
        const CEO = document.createElement('p')
        const CONTROL = document.createElement('div')
        const BUTTON = document.createElement('a')
        const COMMENT = document.createElement('p');
        // Классы для блоков
        CARD.classList.add('catalog-company-card');
        CARD.setAttribute('owner', this.owner);
        NAME.classList.add('catalog-company-card-name');
        TIN.classList.add('catalog-company-card-TIN');
        ADDRESS.classList.add('catalog-company-card-address');
        TEL.classList.add('catalog-company-card-tel');
        CEO.classList.add('catalog-company-card-CEO');
        CONTROL.classList.add('catalog-company-card-control')
        COMMENT.classList.add('catalog-company-card-comment');
        COMMENT.classList.add('default-link');
        BUTTON.classList.add('catalog-company-card-button');
        BUTTON.classList.add('default-btn');
        // Заполнить блоки <p> с отдельными данными о компании
        NAME.textContent = this.name;
        TIN.innerHTML = '<span>ИНН:</span> ' + this.TIN;
        ADDRESS.innerHTML = '<span>Адрес:</span> ' + this.address;
        TEL.innerHTML = '<span>Телефон:</span> ' + this.tel;
        CEO.innerHTML = '<span>Генеральный директор:</span> ' + this.CEO;
        COMMENT.textContent = 'Оставить отзыв';
        BUTTON.textContent = 'Подробнее';
        // Событие при нажатии на кнопку "Добавить коментарий"
        COMMENT.onclick = () => add_comment(this.id, this.name);
        // Ссылка для перехода на страницу компании
        BUTTON.href = '/company.php?id=' + this.id;
        // Поместить все блоки с данными в карточку компании, а эту карточку в блок всех каталога карточек
        CONTROL.append(COMMENT, BUTTON);
        CARD.append(NAME, HR, TIN, ADDRESS, TEL, CEO, CONTROL);
        PARENT.append(CARD);
        // Если пользователь владелец компании добавить значок мусорки
        if (this.owner === USER.id) {
            const ID = this.id;
            const OWNER = this.owner;
            const TRASH = document.createElement('div');
            TRASH.classList.add('card-trash-icon');
            TRASH.style.backgroundImage = 'url(src/svg/trash.svg)';
            CARD.append(TRASH);
            TRASH.onclick = function () {
                if (confirm('Компания будет удалена. Продолжить?'))
                    remove_company(ID, OWNER, CARD);
            }
        }

    }
}
// END КЛАССЫ
//-------------------------------------------------------------------------------------------------
// КОНСТАНТЫ И ПЕРЕМЕННЫЕ
// Блок со списком компаний
const COMPANIES_CATALOG = document.getElementById('catalog');
// Кнопка "Показать все компании"
const SHOW_ALL_COMPANIES_BTN = document.getElementById('show-all-companies-btn');
// Переменная будет хранить обьект всех компаний в Базе Данных
let all_companies;
// END КОНСТАНТЫ И ПЕРЕМЕННЫЕ
//-------------------------------------------------------------------------------------------------
// ЗАГРУЗКА КОМПАНИЙ
// Получить список компаний (AJAX) и показать их на странице
// Будет вызвана при загрузке страницы, а так же при сбросе поиска
function show_all_companies() {
    // Очистить каталог перед наполнением
    COMPANIES_CATALOG.innerHTML = '';
    // Ajax
    const XHR = new XMLHttpRequest();
    XHR.open('GET', 'server/ajax/get_company.php');
    XHR.send();
    // Заглушка загрузки
    // XHR.onloadstart = function () {}
    XHR.onload = function () {
        // Полученный json с данными о компании парсим в обьект OBJ
        const COMPANY_DATA = all_companies = JSON.parse(XHR.response);
        // Циклом создаём карточки для всех компаний
        for (getCompany of COMPANY_DATA) {
            // Создаём экземпляр класса для создания карточки компании
            const COMPANY = new CompanyCard(getCompany);
            /* Так как мы создали свой класс, мы можем изменить нужные свойсва компании перед вызовом метода add()
            Пример: [COMPANY_CARD.name = 'Альфабет'], но в данном случае, ничего менять не будем.
            Метод add() - внедряет данные в тело страницы, принимает DOM елемент в котором будут строиться карточки компаний*/
            COMPANY.add(COMPANIES_CATALOG);
            // Скрыть пнопку "Показать все компании"
            SHOW_ALL_COMPANIES_BTN.classList.add('hidden');
        }
    }
}
// Вызвать функцию, при загрузке страницы
show_all_companies();
// END ЗАГРУЗКА КОМПАНИЙ
//-------------------------------------------------------------------------------------------------
// ПОИСК
// Меню поиска
const SEARCH_LIST = document.querySelectorAll('#header-search-icon>div>ul>li');
// Мобильная кнопка для поиска
const MOBILE_SEARCH_BTN = document.getElementById('mobile-search-btn');
// Окно поиска
const SEARCH_BLOCK = document.getElementById('search-block');
// Форма ввода поиска
const SEARCH_INPUT = SEARCH_BLOCK.querySelector('input')
// Кнопка "Закрыть" в поиске
const SEARCH_CLOSE_BTN = SEARCH_BLOCK.querySelector('button');
// При нажатии на кнопку для мобильного поиска
MOBILE_SEARCH_BTN.onclick = () => SEARCH_LIST[0].dispatchEvent(new Event('click'));
// При нажатии на одну из кнопок из списка поиска
for (elem of SEARCH_LIST) {
    elem.onclick = function () {
        // Получить условие поиска из атрибута кнопки на которую нажал польхователь
        searchTerm = this.getAttribute('search');
        // Отобразить форму поиска
        SEARCH_BLOCK.classList.remove('hidden');
        // Указать пользователю условие полиска
        SEARCH_BLOCK.querySelector('p').textContent = (searchTerm == 'name')
            ? 'Введите название компании' : 'Введите ИНН компании';
        // Отслеживание кликов мышки, что-бы скрыть форму
        SEARCH_BLOCK.addEventListener('click', hide_search);
        // Выполнение поиска (передать условие поиска)
        search_company(searchTerm);
    }
}
// Функция для отслеживания события и скрытия блока поиска или при начале поиска
function hide_search() {
    // Нажатие на кнопку "Закрыть"
    SEARCH_CLOSE_BTN.onclick = hide;
    // Клавиша Escape, если форма ввода пуста
    document.onkeydown = e => {
        if (e.key == "Escape" && SEARCH_INPUT.value == '') hide();
    }
    // Клик по фону вне формы
    SEARCH_BLOCK.onclick = e => {
        // Если кликнуть вне окна - форма скроется
        if (e.target == SEARCH_BLOCK) hide()
    }
    // Функция скрыть окно поика
    function hide() {
        SEARCH_BLOCK.classList.add('hidden')
        // Очистить форму поиска
        SEARCH_INPUT.value = '';
        // Удалить отслеживание
        SEARCH_BLOCK.removeEventListener('click', hide_search);
    }
}
// Функция выполняющая поиск компаний при вводе в строку поиска
function search_company(searchTerm) {
    // Событие на каждый ввод в поисковую строку
    SEARCH_INPUT.oninput = function () {
        // Очистить блок каталога
        COMPANIES_CATALOG.innerHTML = null;
        // Показать кнопку "Показать все компании"
        SHOW_ALL_COMPANIES_BTN.classList.remove('hidden');
        // Циклом пройтись по всем сущесвующим компаниям
        for (company of all_companies) {
            // Если надо найти по имени
            if (searchTerm == 'name') {
                // Проверяем есть ли сопадение в имени с введённым текстом поиска
                // Или строка поиска пуста
                if (!company.name.toLocaleLowerCase().includes(this.value.toLocaleLowerCase())) continue;
            }
            // Если надо найти по ИНН
            else if (searchTerm == 'TIN') {
                // Проверка с начала строки
                if (!company.TIN.startsWith(this.value)) continue;
            }
            const COMPANY = new CompanyCard(company);
            COMPANY.add(COMPANIES_CATALOG);
        }
    }
}
// Событие при нажатии на кнопку "Показать все компании"
SHOW_ALL_COMPANIES_BTN.onclick = show_all_companies;
// END ПОИСК
//-------------------------------------------------------------------------------------------------
// КОМЕНТАРИИ К КОМПАНИЯМ
// Всплывающее окно для коментариев
const COMMENT_DIALOG = document.getElementById('comment-dialog');
const COMMENT_COMPANY_NAME = COMMENT_DIALOG.querySelector('h3');
const COMMENT_TEXTAREA = COMMENT_DIALOG.querySelector('textarea');
const VISIBILITY_LIST = COMMENT_DIALOG.querySelectorAll('input[name=comment_visibility]');
const COMMENT_CLOSE_BTN = document.getElementById('comment-close-btn');
const COMMENT_SUBMIT_BTN = document.getElementById('comment-submit-btn');

// Функция: Показать форму ввода коментария к компании
function add_comment(company_id, name) {
    COMMENT_COMPANY_NAME.textContent = name;
    COMMENT_DIALOG.showModal();
    // Кнопка "Отмена"
    COMMENT_CLOSE_BTN.onclick = function () {
        // Если в форме есть текст - потребовать подтверждения
        if (COMMENT_TEXTAREA.value.length > 0) {
            if (!confirm('Вы уверены, что хотите удалить текст и выйти?')) return;
        }
        // Очистить форму
        COMMENT_TEXTAREA.value = '';
        // Закрыть окно
        COMMENT_DIALOG.close();
    }
    // Разрешения для выбора параметров видемости
    if (USER.token === undefined) {
        for (input of VISIBILITY_LIST) {
            if (input.value != 'all') {
                const LABEL = input.nextElementSibling;
                input.setAttribute('disabled', '');
                LABEL.setAttribute('title', 'Войдите, что выбрать');
                LABEL.classList.remove('default-link');
                LABEL.style.cursor = 'not-allowed';
                LABEL.style.color = '#555';
            }
        }
    }
    // Кнопка "Отправить"
    COMMENT_SUBMIT_BTN.onclick = function () {
        // Проверка, что условия формы выполнены (есть текст)
        if (!COMMENT_TEXTAREA.validity.valid) {
            COMMENT_TEXTAREA.placeholder = 'Сначала что-нибудь напишите...'
            return;
        }
        // Получить параметры настроек видемости
        const VISIBILITY = COMMENT_DIALOG.querySelector('input:checked').value;
        // Заблокировать кнопку отправить, что-бы избежать повторной отправки
        COMMENT_SUBMIT_BTN.setAttribute('disabled', '');
        // AJAX
        const XHR = new XMLHttpRequest();
        XHR.open('POST', 'server/ajax/set_comment.php')
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(`company_id=${company_id}&token=${USER.token}&visibility=${VISIBILITY}&text=${COMMENT_TEXTAREA.value}`);
        // Если коментарий успешно отправлен - закрыть форму
        XHR.onload = function () {
            // Если коментарий успешно записан в БД
            if (XHR.status == 200 && XHR.response == 1) {
                // Сжать окно
                COMMENT_DIALOG.style.transform = 'scale(0)';
                // Когда окно полностью сжато
                COMMENT_DIALOG.ontransitionend = function () {
                    // Очистить форму 
                    COMMENT_TEXTAREA.value = '';
                    // Закрыть окно
                    COMMENT_DIALOG.close();
                    // Разблокировать кнопку отправки
                    COMMENT_SUBMIT_BTN.removeAttribute('disabled');
                    // Вернуть скрытому блоку нормальный размер
                    COMMENT_DIALOG.style.transform = 'none'
                    // Уведомление
                    notification('Коментарий добавлен');
                }

            }
        }
    }
}

// ДОБАВИТЬ НОВУЮ КОМПАНИЮ
// Вставляем html формы в конец body с помощью fetch из внешнего файла
async function new_company() {
    // Загрузить и показать форму
    const FORM = new loadHTML;
    await FORM.load('https://test-website.cf/inc/new_company');

    // Скрипт формы
    // Родительский блок с формой
    const PARENT_BLOCK = document.getElementById('new-company-block');
    // Форма для заполнения данных с новой компанией
    const FORM_BLOCK = PARENT_BLOCK.querySelector('form');
    // Все input + textarea элементы
    const INPUTS_LIST = PARENT_BLOCK.querySelectorAll('input, textarea');
    // Строка для уведомлений
    const MESSAGE = document.getElementById('new-company-form-message');
    // Полоска зашрузки
    const LINE = document.getElementById('new-company-form-loading');
    // Кнопка "Отмена"
    const CLOSE_BTN = document.getElementById('new-company-close-btn');
    // Кнопка "Отправить"
    const SUBMIT_BTN = document.getElementById('new-company-submit-btn');
    // При нажатии на клавишу "Escape" (эмуляция клика на "Отмена")
    document.onkeydown = e => {
        if (e.key == 'Escape')
            CLOSE_BTN.dispatchEvent(new Event('click'));
    }
    // При нажатии на кнопку "Отмена"
    CLOSE_BTN.onclick = function () {
        // Проверка, есть ли тект в каком либо input элементе
        for (input of INPUTS_LIST) {
            if (input.value != '') {
                if (!confirm('Вы уверены, что хотите закрыть окно?')) return;
                break;
            }
        }
        // Закрыть форму
        FORM.close();
    }
    // При отправке формы
    PARENT_BLOCK.onsubmit = e => {
        // Отключить стандартную отправку формы
        e.preventDefault();
        // Заблокировать кнопку "Отправить"
        SUBMIT_BTN.setAttribute('disabled', '');
        // Строка для сбора значений с форм
        let gets = '';
        // Наполнить строку значениями через цикл forEach
        INPUTS_LIST.forEach(input => gets += '&' + input.name + '=' + input.value);
        // Добавть свой токен
        gets += '&user_token=' + USER.token;
        // AJAX (fetch), запускаем функцию done со статусом выполения в аргументе
        fetch('server/ajax/set_company.php?' + gets)
            .then(response => done(response.ok))
            .catch(submit_error);
        function done(ok) {
            // Если успешно
            if (ok) {
                MESSAGE.innerHTML = 'Запись данных...';
                LINE.style.width = '100%';
                // Ждём когда полоска полностью растянется
                LINE.ontransitionend = function () {
                    // Закрыть окно
                    FORM.close();
                    // Вывести уведомление
                    notification('Новая компания успешно добавлена');
                    // Обновить каталог карточек компаний
                    show_all_companies();
                }
            }
            // Если отправить не удалось
            else {
                MESSAGE.textContent = 'Не удалось добавить компанию';
                SUBMIT_BTN.removeAttribute('disabled');
            }
        }

        function submit_error() {
            MESSAGE.textContent = 'Не удалось добавить компанию';
            SUBMIT_BTN.removeAttribute('disabled');
        }
    }
}

// Функция - удалить компанию
async function remove_company(id, owner, card) {
    await fetch(`server/ajax/remove_company.php?id=${id}&owner=${owner}&token=${USER.token}`);
    card.remove();
    notification('Компания удалена');
}