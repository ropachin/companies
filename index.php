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
    ?>
    <main>
        <div id="catalog"></div>
        <?php if (isset($_COOKIE['user-token'])) : ?>
            <a href="#" class="default-btn" id="new_company_btn" onclick="new_company()">Новая компания</a>
            <?php
            include 'inc/float_comment';
            ?>
        <?php endif ?>
    </main>
</body>

</html>