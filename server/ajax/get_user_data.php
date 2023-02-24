<?php
include '../../inc/db_connect';
$result = $mysql->query("SELECT * FROM `users` WHERE `token` = '{$_COOKIE['user-token']}'");
echo json_encode(mysqli_fetch_assoc($result));
$mysql->close();