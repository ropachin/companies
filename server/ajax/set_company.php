<?php
// Добавление новой компании в базу данных
include '../../inc/db_connect';
$name = $_GET['name'];
$TIN = $_GET['TIN'];
$address = $_GET['address'];
$tel = $_GET['tel'];
$CEO = $_GET['CEO'];
$info = $_GET['info'];
$user_token = $_GET['user_token'];
// Получить id пользователя по токену
$user_id = $mysql->query("SELECT `id` FROM `users` WHERE `token` = '$user_token'")->fetch_row()[0];
echo $mysql->query("INSERT INTO `companies`(`name`, `TIN`, `CEO`, `address`, `tel`, `info`, `owner`) VALUES ('$name', '$TIN', '$address', '$tel', '$CEO', '$info', '$user_id')");
$mysql->close();