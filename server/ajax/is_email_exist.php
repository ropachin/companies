<?php
include '../../inc/db_connect';
$result = $mysql->query("SELECT `id` FROM `users` WHERE `email` = '{$_POST['email']}'");
echo $result->num_rows;
