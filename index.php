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
            <script>
                function new_company() {
                    NEW_COMPANY_BLOCK.classList.remove('hidden');
                }
            </script>
            <?php
            include 'inc/new_company';
            include 'inc/float_comment';
            ?>
        <?php endif ?>
    </main>
</body>

</html>