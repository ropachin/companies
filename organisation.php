<!DOCTYPE html>
<html lang="ru">

<head>
    <?php require 'inc/head_inc' ?>
    <link rel="stylesheet" href="/css/organisation.css">
    <script src="/js/organisation.js" defer></script>
    <title>Организация</title>
</head>

<body>
    <?php require 'inc/header' ?>
    <?php if (!isset($_COOKIE['token'], $_COOKIE['organisation'])) : ?>
        <main>
            <p>Вы не состоите в организации</p>
            <p>Попросите друзей отправить отправить вам приглашение по вашему id:
                <span id="organisation-user-id">55</span>
            </p>
            <p>Или <span id="org-form-show-btn" class="default-link">создайте</span> новую...</p>
            <fieldset id="organisation-form">
                <legend>Новая организация</legend>
                <input type="text" class="default-input-text" placeholder="Имя организации" minlength="2" maxlength="50" required>
                <br>
                <button type="button" class="default-btn" onclick="org_create()">Создать</button>
                <button type="reset" class="default-btn" onclick="org_hide_form()">Скрыть</button>
            </fieldset>
        </main>
    <?php else : ?>
        <!-- проверка на админа организации -->
        <!-- интерфейс с пользователями, обьявления, чат -->
    <?php endif ?>
</body>

</html>