<!DOCTYPE html>
<html lang="ru">

<head>
    <?php require 'inc/head_inc' ?>
    <title>Авторизация</title>
    <link rel="stylesheet" href="css/auth.css">
</head>

<body>
    <?php require 'inc/header' ?>
    <main id="auth-main">
        <?php if (isset($_GET['reg'])) : ?>
            <!-- Если нужна форма регистрации -->
            <form id="auth-form" name="reg_form">
                <h1>Регистрация</h1>
                <div class="auth-inputs-parent">
                    <input class="default-input-text" type="text" name="name" placeholder="ФИО" minlength="8" maxlength="50" required pattern="^[А-Яа-яЁё\s]+$">
                    <input class="default-input-text" type="email" name="email" placeholder="E-MAIL" minlength="8" maxlength="50" required>
                    <input class="default-input-text" type="password" name="password" name="password" placeholder="Пароль" minlength="8" maxlength="32" required>
                    <input class="default-input-text" type="password" name="password" placeholder="Повторите пароль" minlength="8" maxlength="32" required>
                    <button class="default-btn" type="submit">Зарегестрироваться</button>
                </div>
                <p id="auth-message">&nbsp</p>
            </form>
            <!-- Подключение js скрипта только для регистрации -->
            <script src="/js/auth_reg.js" defer></script>
        <?php else : ?>
            <!-- Если нужна форма регистрации авторизации -->
            <form id="auth-form" name="login_form">
                <h1>Авторизация</h1>
                <div class="auth-inputs-parent">
                    <input class="default-input-text" type="email" name="email" placeholder="E-MAIL" minlength="8" maxlength="50" required>
                    <input class="default-input-text" type="password" name="password" name="password" placeholder="Пароль" minlength="8" maxlength="32" required>
                    <button class="default-btn" type="submit">Войти</button>
                </div>
                <p id="auth-message">&nbsp</p>
                <p id="login-timer">&nbsp</p>
            </form>
            <!-- Подключение js скрипта только для регистрации -->
            <script src="/js/auth_login.js" defer></script>
        <?php endif ?>
    </main>
</body>

</html>