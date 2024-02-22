<?php
// Добавление новой организации в базу данных
include '../../inc/db_connect';
$name = $_POST['name'];
$token = $_COOKIE['token'];
// Получить id пользователя по токену
$user_id = $mysql->query("SELECT `id` FROM `users` WHERE `token` = '$token'")->fetch_row()[0];
echo $mysql->query("INSERT INTO `organizations`(`name`, `admin_id`) VALUES ('$name','$user_id')");
