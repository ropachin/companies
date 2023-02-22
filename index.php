<!DOCTYPE html>
<html lang="ru">

<head>
    <?php require 'inc/head_inc' ?>
    <title>Тестовое задание</title>
    <link rel="stylesheet" href="index.css">
    <script src="index.js" defer></script>
</head>

<body>
    <?php
    require 'inc/header';
    include 'inc/search';
    include 'inc/float_comment';
    ?>
    <main>
        <div id="catalog"></div>
        <a href="#" class="default-btn" id="new_company_btn">Новая компания</a>
    </main>
</body>

</html>