<!DOCTYPE html>
<html lang="ru">

<head>
    <?php require 'inc/head_inc' ?>
    <title>Организация</title>
</head>

<body>
    <?php require 'inc/header' ?>
    <?php if (!isset($_COOKIE['token'], $_COOKIE['organisation'])) : ?>
        <main>
            <p>Вы не состоите в организации</p>
            <p>Попросите друзей отправить отправить вам приглашение по вашему id: <b>55</b></p>
            <p>Или создайте новую:</p>
            <form action="" style="width: min(480px, 100%)">
                <fieldset>
                    <legend>Новая организация</legend>
                    <input type="text" class="default-input-text" placeholder="Имя организации" required>
                </fieldset>
            </form>
        </main>
    <?php else : ?>
        <!-- проверка на админа организации -->
        <!-- интерфейс с пользователями, обьявления, чат -->
    <?php endif ?>
</body>

</html>