<?php
// Добавление новой компании в базу данных
include '../../inc/db_connect';
$name = $_GET['name'];
$TIN = $_GET['TIN'];
$address = $_GET['address'];
$tel = $_GET['tel'];
$CEO = $_GET['CEO'];
$mysql->query("INSERT INTO `companies`(`name`, `TIN`, `CEO`, `address`, `tel`) VALUES ('$name','$TIN','$address', '$tel','$CEO')");
