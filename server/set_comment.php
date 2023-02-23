<?php
// Скрипт, записывает коментарий пользователя в базу данных
include '../inc/db_connect';
$date = date('Y:m:d');
echo $mysql->query("INSERT INTO `comments`(`company_id`, `user_id`, `visibility`, `text`,`date`) VALUES ('{$_POST['company_id']}','{$_POST['user_id']}','{$_POST['visibility']}','{$_POST['text']}','$date')");
