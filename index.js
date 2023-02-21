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
        const COMPANY = new CompanyCard(getCompany);
        /* Так как мы создали свой класс, мы можем изменить нужные свойсва компании перед вызовом метода add()
        Пример: [COMPANY_CARD.name = 'Альфабет'], но в данном случае, ничего менять не будем.
        Метод add() - внедряет данные в тело страницы, принимает DOM елемент в котором будут строиться карточки компаний*/
        COMPANY.add(COMPANIES_CATALOG);
    }
}


