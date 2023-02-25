<?php
include '../../inc/db_connect';
// Полученные от пользователя POST параметры
$email = trim($_POST['email']);
$password = md5(trim($_POST['password']) . '*-_-*');
// Массив с результатом для отправки клиенту
$response = ['status' => 400, 'data' => null];
// Чтение данных пользовател с БД
$result = $mysql->query("SELECT `name`, `email`, `token` FROM `users` WHERE `email` = '$email' AND `password` = '$password'");
// Если пользователь найден
if ($result->num_rows != 0) {
    // Статус ответа на 200 (Удачно)
    $response['status'] = 200;
    // Записываем токен пользователя в ответ
    $response['data'] = $result->fetch_assoc();
}
// Отправить клиенту json строку с токеном пользователя и статусом
echo json_encode($response);
$mysql->close();
