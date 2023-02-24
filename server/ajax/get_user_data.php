<?php
include '../../inc/db_connect';
$token = $_COOKIE['user-token'] ?? null;
$result = $mysql->query("SELECT * FROM `users` WHERE `token` = '$token'");
echo json_encode(mysqli_fetch_assoc($result));
$mysql->close();
