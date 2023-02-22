// Класс для создания карточек компаний в списке (принимает response обьект с даннsми компании с сервера)
class CompanyCard {
    // Свойсва класса (используемые данные компании)
    name; TIN; info; CEO; address; tel;
    // Конструктор принимает полученный с сервера обьект компании
    constructor(responseObj) {
        this.name = responseObj.name;
        this.TIN = responseObj.TIN;
        this.info = responseObj.info;
        this.CEO = responseObj.CEO;
        this.address = responseObj.address;
        this.tel = responseObj.tel;
    }
    // Метод для построения и внедрения полученных данных в DOM страницы
    add(PARENT) {
        // Создать HTML елементы
        const CARD = document.createElement('div');
        const NAME = document.createElement('p');
        const HR = document.createElement('hr');
        const TIN = document.createElement('p');
        const ADDRESS = document.createElement('p');
        const TEL = document.createElement('p');
        const CEO = document.createElement('p')
        // Классы для блоков
        CARD.classList.add('catalog-company-card');
        NAME.classList.add('catalog-company-card-name');
        TIN.classList.add('catalog-company-card-TIN');
        ADDRESS.classList.add('catalog-company-card-address');
        TEL.classList.add('catalog-company-card-tel');
        CEO.classList.add('catalog-company-card-CEO');
        // Заполнить блоки <p> с отдельными данными о компании
        NAME.textContent = this.name;
        TIN.innerHTML = '<span>ИНН:</span> ' + this.TIN;
        ADDRESS.innerHTML = '<span>Адрес:</span> ' + this.address;
        TEL.innerHTML = '<span>Телефон:</span> ' + this.tel;
        CEO.innerHTML = '<span>Генеральный директор:</span> ' + this.CEO;
        // Поместить все блоки с данными в карточку компании, а эту карточку в блок всех каталога карточек
        CARD.append(NAME, HR, TIN, ADDRESS, TEL, CEO);
        PARENT.append(CARD);
    }
}

// КОНСТАНТЫ И ПЕРЕМЕННЫЕ
const COMPANIES_CATALOG = document.getElementById('catalog'); // Блок со списком компаний
// Переменная будет хранить обьект всех компаний в Базе Данных
let all_companies;
// Получить список компаний (AJAX)
const XHR = new XMLHttpRequest();
XHR.open('GET', 'server/get_company.php');
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
    }
}

// ПОИСК
// Меню поиска
const SEARCH_LIST = document.querySelectorAll('#header-search-icon>div>ul>li');
// Окно поиска
const SEARCH_BLOCK = document.getElementById('search-block');
// Форма ввода поиска
const SEARCH_INPUT = SEARCH_BLOCK.querySelector('input')
for (elem of SEARCH_LIST) {
    elem.onclick = function () {
        // Отобразить форму поиска
        SEARCH_BLOCK.style.display = 'grid';
        // Отслеживание кликов мышки, что-бы скрыть форму
        SEARCH_BLOCK.addEventListener('click', hide_search);
        // Выполнение поиска (передать условие поиска)
        search_company(this.getAttribute('search'));
    }
}

// Функция для отслеживания события и скрытия блока поиска или при начале поиска
function hide_search() {
    SEARCH_BLOCK.onclick = SEARCH_BLOCK.onsubmit = e => {
        // Если кликнуть вне окна - форма скроется
        if (e.target == SEARCH_BLOCK) {
            this.style.display = 'none';
            // Очистить форму поиска
            SEARCH_INPUT.value = '';
            // Удалить отслеживание
            SEARCH_BLOCK.removeEventListener('click', hide_search);
        }
    }
}

// Функция выполняющая поиск компаний
function search_company(search = 'name') {
    // Событие на каждый ввод в поисковую строку
    SEARCH_INPUT.oninput = function () {
        // Очистить блок каталога
        COMPANIES_CATALOG.innerHTML = null;
        // Циклом пройтись по всем сущесвующим компаниям
        for (company of all_companies) {
            // Если надо найти по имени
            if (search == 'name') {
                // Проверяем есть ли сопадение в имени с введённым текстом поиска
                // Или строка поиска пуста
                if (!company.name.toLocaleLowerCase().includes(this.value.toLocaleLowerCase())) continue;
            }
            // Если надо найти по ИНН
            else if (search == 'TIN') {
                // Проверка с начала строки
                if (!company.TIN.startsWith(this.value)) continue;
            }
            const COMPANY = new CompanyCard(company);
            COMPANY.add(COMPANIES_CATALOG);
        }
    }
}

