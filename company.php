<?php
require 'inc/db_connect';
// Получаем данные о компании из бд и сразу конверируем mysqli обьект в ассоциативный массив
$company = $mysql->query("SELECT * FROM `companies` WHERE `id` = '{$_GET['id']}'")->fetch_assoc();

?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <?php require 'inc/head_inc' ?>
    <title><?= $company['name'] ?></title>
    <link rel="stylesheet" href="css/company.css">
    <script src="js/company.js" defer></script>
</head>

<body>
    <?php
    require 'inc/header';
    ?>
    <main>
        <h1 id="company-title"><?= $company['name'] ?></h1>
        <dl id="company-details">
            <dt>Полное наименование:</dt>
            <dd><?= $company['name'] ?> </dd>
            <dt>ИНН:</dt>
            <dd><?= $company['TIN'] ?> </dd>
            <dt>Генеральный директор:</dt>
            <dd><?= $company['CEO'] ?> </dd>
            <dt>Адрес:</dt>
            <dd><?= $company['address'] ?> </dd>
            <dt>Телефон:</dt>
            <dd><?= $company['tel'] ?> </dd>
            <dt>Общая информация:</dt>
            <dd><?= $company['info'] ?> </dd>
        </dl>
    </main>
</body>

</html>