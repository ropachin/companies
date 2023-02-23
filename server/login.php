<?php
include '../inc/db_connect';
$email = trim($_POST['email']);
$password = trim($_POST['password']);
//  в БД
$result = $mysql->query("INSERT INTO `users` (`name`,`email`,`password`,`token`) VALUES ('$name','$email','$password','$token')");
// Запись кук на пол года
setcookie('user-token', $token, time() + 60 * 60 * 24 * 30 * 180, '/');
// Редирект на главную
header('location: /');
