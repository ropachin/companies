// Блок со списком компаний
const COMPANIES_CATALOG = document.getElementById('catalog');

// Класс для создания карточек компаний в списке
class CompanyCard {
    // Конструктор принимает полученный с сервере обьект компании создаём блоки в DOM и заполняет их.
    constructor(responseObj) {
        this.TIN = responseObj.TIN;
        this.info = responseObj.info;
        this.CEO = responseObj.CEO;
        this.address = responseObj.address;
        this.tel = responseObj.tel;
        // Создать DOM елементы
        const CARD = document.createElement('div');
        const NAME = document.createElement('p');
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
        NAME.innerHTML = responseObj.name;
        TIN.innerHTML = '<span>ИНН:</span> ' + responseObj.TIN;
        ADDRESS.innerHTML = '<span>Адрес:</span> ' + responseObj.address;
        TEL.innerHTML = '<span>Телефон:</span> ' + responseObj.tel;
        // Поместить все блоки с данными в карточку компании, а эту карточку в блок всех каталога карточек
        CARD.append(NAME, TIN, ADDRESS, TEL);
        document.body.append(CARD);
    }
}

// Получить список компаний (AJAX)
const XHR = new XMLHttpRequest();
XHR.open('GET', 'server/get_company.php');
XHR.send();
XHR.onload = function () {
    // Полученный json с данными о компании парсим в обьект OBJ
    const COMPANY_DATA = JSON.parse(XHR.response);
    // Массивом создаём карточки для всех компаний
    for (getCompany of COMPANY_DATA) {
        // Создаём экземпляр класса для создания карточки компании
        const COMPANY_CARD = new CompanyCard(getCompany);
    }
}


