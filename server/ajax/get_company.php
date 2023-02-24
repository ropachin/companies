<?php
include '../../inc/db_connect';
$result = $mysql->query("SELECT * FROM `companies` ORDER BY `id` DESC");
echo !$result->num_rows ?: json_encode($result->fetch_all(MYSQLI_ASSOC), JSON_UNESCAPED_UNICODE);
$mysql->close();
