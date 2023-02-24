<?php
// Добавление новой компании в базу данных
include '../../inc/db_connect';
$name = $_GET['name'];
$TIN = $_GET['TIN'];
$address = $_GET['address'];
$tel = $_GET['tel'];
$CEO = $_GET['CEO'];
$user_id = $_COOKIE['user-token'];
echo $mysql->query("INSERT INTO `companies`(`name`, `TIN`, `CEO`, `address`, `tel`, `owner`) VALUES ('$name', '$TIN', '$address', '$tel', '$CEO', '$user_id')");
$mysql->close();