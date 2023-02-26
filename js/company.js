// Ассоциативный с разьяснениями значений видимости
const VISIBILITYS = new Map([['all', 'Видят все'], ['сolleagues', 'Коллеги'], ['self', 'Только я']]);
// Форма отправки коментария
const COMPANY_COMMENT_FORM = document.getElementById('company-comment-form');
// Отправка коментария
COMPANY_COMMENT_FORM.onclick = function (e) {
    // Textarea для коментария
    const TEXTAREA = COMPANY_COMMENT_FORM.querySelector('textarea');
    const VISIBILITY = COMPANY_COMMENT_FORM.querySelector('input[name=comment_visibility]:checked')

    if (TEXTAREA.value.trim().length == 0) {
        TEXTAREA.focus();
        return;
    }
    const XHR = new XMLHttpRequest();
    XHR.open('POST', 'server/ajax/set_comment.php')
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send('token=' + USER.token + '&company_id=' + COMPANY_ID + '&text=' + TEXTAREA.value.trim() + '&visibility=' + VISIBILITY.value);
    XHR.onload = function () {
        // Если коментарий успешно записан в БД
        if (XHR.status == 200 && XHR.response == 1) {
            notification('Коментарий добавлен');
            const COMMENT = document.createElement('fieldset');
            COMMENT.classList.add('company-comment');
            const LEGEND = document.createElement('legend');
            LEGEND.classList.add('company-comment-name');
            LEGEND.textContent = USER.name;
            const VISIBILITY_P = document.createElement('p');
            VISIBILITY_P.classList.add('company-comment-visibility');
            VISIBILITY_P.textContent = VISIBILITYS.get(VISIBILITY.value.trim());
            const TEXT_P = document.createElement('p');
            TEXT_P.classList.add('company-comment-text');
            TEXT_P.textContent = TEXTAREA.value.trim();
            const DATE_P = document.createElement('p');
            DATE_P.classList.add('company-comment-date');
            DATE_P.textContent = 'Только-что';
            COMMENT.append(LEGEND, VISIBILITY_P, TEXT_P, DATE_P);
            COMPANY_COMMENT_FORM.after(COMMENT);
            TEXTAREA.value = '';
        } else {
            notification('Не удалось создать коментарий');
        }
    }
}