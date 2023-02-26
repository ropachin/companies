<?php
// Скрипт, записывает коментарий пользователя в базу данных
include '../../inc/db_connect';
// Получить id пользователя если есть
$user_id = ($_POST['token'] !== 'undefined')
    ? $mysql->query("SELECT `id` FROM `users` WHERE `token` = '{$_POST['token']}'")->fetch_row()[0]
    : 0;
$date = date('Y:m:d');
echo $mysql->query("INSERT INTO `comments`(`company_id`, `user_id`, `visibility`, `text`,`date`) VALUES ('{$_POST['company_id']}','$user_id','{$_POST['visibility']}','{$_POST['text']}','$date')");
$mysql->close();
