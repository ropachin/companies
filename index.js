// Блок со списком компаний
const CATALOG = document.getElementById('catalog');
// Класс для создания карточки компании в списке
class CompanyCard {
    name; tin; info; CEO; address; tel;
    // constructor() {}
    create() {
        const CARD = document.createElement('div');
        CARD.textContent = this.name;
        document.body.append(CARD);
    }
}


// Получить список компаний (AJAX)
const XHR = new XMLHttpRequest();
// XHR.open('GET','');



let comcapany = new CompanyCard();
company.name = 'Хлебопечка';
company.create();