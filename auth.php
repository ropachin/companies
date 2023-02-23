<!DOCTYPE html>
<html lang="ru">

<head>
    <?php require 'inc/head_inc' ?>
    <title>Тестовое задание</title>
    <link rel="stylesheet" href="css/auth.css">
    <script src="js/auth.js" defer></script>
</head>

<body>
    <?php require 'inc/header' ?>
    <main id="auth-main">
        <?php if (isset($_GET['reg'])) : ?>
            <!-- Если нужна форма регистрации -->
            <form class="auth-form" method="post" action="/server/reg.php">
                <h1>Регистрация</h1>
                <div class="auth-inputs-parent">
                    <input class="default-input-text" type="text" name="name" require minlength="8" maxlength="50" placeholder="ФИО">
                    <input class="default-input-text" type="email" name="email" require minlength="8" maxlength="50" placeholder="E-MAIL">
                    <input class="default-input-text" type="password" name="password" require minlength="8" maxlength="32" name="password" id="reg-pass-1" placeholder="Пароль">
                    <input class="default-input-text" type="password" require minlength="8" maxlength="32" name="password" id="reg-pass-2" placeholder="Повторите пароль">
                    <input class="default-btn auth-btn" type="submit" value="Зарегестрироваться">
                </div>
            </form>
        <?php else : ?>
            <!-- Если нужна форма регистрации авторизации -->
        <?php endif ?>
    </main>
</body>

</html>