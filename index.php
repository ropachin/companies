<!DOCTYPE html>
<html lang="ru">

<head>
    <?php require 'inc/head_inc' ?>
    <title>Тестовое задание</title>
    <link rel="stylesheet" href="css/index.css">
    <script src="js/index.js" defer></script>
</head>

<body>
    <?php
    require 'inc/header';
    include 'inc/search';
    include 'inc/float_comment';
    ?>
    <main>
        <div id="index-control-panel">
            <a href="#" class="default-btn only-user-visible" id="new_company_btn" onclick="new_company()">Новая компания</a>
            <p class="default-btn hidden" id="show-all-companies-btn">Показать все компании</p>
        </div>
        <div id="catalog"></div>
    </main>
</body>

</html>