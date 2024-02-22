const USER_ID_BTN = document.getElementById('organisation-user-id');
const ORG_SHOW_FORM_BTN = document.getElementById('org-form-show-btn');
const ORG_FORM = document.getElementById('organisation-form');
const ORG_FORM_INPUT = ORG_FORM.querySelector('input[type=text]');
ORG_SHOW_FORM_BTN.onclick = function () {
    ORG_FORM.style.transform = 'scaleY(1)';
}

// Функция "Скрыть форму создания новой организации"
function org_hide_form() {
    ORG_FORM.style.transform = 'scaleY(0)';
    ORG_FORM_INPUT.value = '';
}

// Функция - скопировать user-id в буфер обмена
USER_ID_BTN.onclick = function () {
    navigator.clipboard.writeText(this.textContent)
        .then(() => {
            notification('Ваш ID скопировать в буфер обмена');
        })
        .catch(() => {
            notification('Не удалось скопировать Ваш ID в буфер обмена')
        });
}

// Создать новую организацию
function org_create() {
    const XHR = new XMLHttpRequest();
    XHR.open('POST', '/server/ajax/set_organisation.php');
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send('name=' + ORG_FORM_INPUT.value.trim());
    XHR.onload = function () {
        if (XHR.status == 200 & XHR.response == 1) {
            notification('Организация создана, но дальнейший функционал ещё в разработке');
        }
    }
}