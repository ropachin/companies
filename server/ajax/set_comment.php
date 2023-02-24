<?php
// Скрипт, записывает коментарий пользователя в базу данных
include '../../inc/db_connect';
$date = date('Y:m:d');
// Узнаём id пользователя написавшего коментарий по его токену
$user_id = $mysql->query("SELECT `id` FROM `users` WHERE `token` = '{$_COOKIE['user-token']}'")->fetch_row()[0];
echo $mysql->query("INSERT INTO `comments`(`company_id`, `user_id`, `visibility`, `text`,`date`) VALUES ('{$_POST['company_id']}','$user_id','{$_POST['visibility']}','{$_POST['text']}','$date')");
$mysql->close();