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
        <div id="catalog"></div>
        <a href="#" class="default-btn hidden" id="new_company_btn" onclick="new_company()">Новая компания</a>
    </main>
</body>

</html>