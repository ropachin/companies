<?php
include '../../inc/db_connect';
// Принять json строку с данными пользователя
$data = json_decode(file_get_contents('php://input'), false);
$name = trim($data->name);
$email = trim($data->email);
$password = md5(trim($data->password).'*-_-*') ;
// Проверка не занят ли email
$email_users = $mysql->query("SELECT `email` FROM `users` WHERE `email` = '$email'");
if ($email_users->num_rows) {
    echo 'E-mail ' . $email . ' уже зарегестрирован';
    exit;
}

// Создаём токен с помощью md5
$token = md5($email . $password . '|||');
// Запись в БД
$result = $mysql->query("INSERT INTO `users` (`name`,`email`,`password`,`token`) VALUES ('$name','$email','$password','$token')");
$user_id = mysqli_insert_id($mysql);
if (!$result) {
    echo 400;
    exit;
}
// Вернуть клиенту json с данными пользователя
echo json_encode(['id' => $user_id, 'name' => $name, 'email' => $email, 'token' => $token]);
