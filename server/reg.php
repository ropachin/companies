<?php
include '../inc/db_connect';
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$password = trim($_POST['password']);
// Создаём токен с помощью md5
$token = md5($email . $password . '|||');
// Запись в БД
$result = $mysql->query("INSERT INTO `users` (`name`,`email`,`password`,`token`) VALUES ('$name','$email','$password','$token')");
