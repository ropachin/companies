<?php
// Скрипт, записывает коментарий пользователя в базу данных
include '../inc/db_connect';
echo $mysql->query("INSERT INTO `comments`(`company_id`, `user_id`, `visibility`, `text`) VALUES ('{$_POST['company_id']}','{$_POST['user_id']}','{$_POST['visibility']}','{$_POST['text']}')");
