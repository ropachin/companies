// // Получить id и token пользователя в обьект
let USER = new Object;
fetch('/server/ajax/get_user_data.php')
    .then(response => response.json())
    .then(user => USER = user);