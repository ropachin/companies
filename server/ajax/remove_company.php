<?php
include '../../inc/db_connect';
$company_id = $_GET['id'];
$owner = $_GET['owner'];
$token = $_GET['token'];

// Получить id пользователя по токену
$user_id = $mysql->query("SELECT `id` FROM `users` WHERE `token` = '$token'")->fetch_row()[0];

// Если id ползьзователя не совпадает с id хозяйна компании - прервать удаление
if ($user_id != $owner) {
    echo 1;
    exit;
}

echo $mysql->query("DELETE FROM `companies` WHERE `id` = '$company_id'");
