<?php
require 'inc/db_connect';
$id = $_GET['id'];
// Получаем данные о компании из бд и сразу конверируем mysqli обьект в ассоциативный массив
$company = $mysql->query("SELECT * FROM `companies` WHERE `id` = '$id'")->fetch_assoc();
// Получаем коментарии
$comments = $mysql->query("SELECT * FROM `comments` WHERE `company_id` = '$id' ORDER BY `id` DESC");
// Функция получить имя автора коментария по его id
function get_name($user_id)
{
    global $mysql;
    return ($user_id)
        ? $mysql->query("SELECT `name` FROM `users` WHERE `id` = '$user_id'")->fetch_row()[0]
        : 'Гость';
}

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
        <div id="company-comments">
            <fieldset id="company-comment-form" class="company-comment">
                <legend>Новый коментарий:</legend>
                <textarea class="default-input-text" name="comment" id="company-comment-input" rows="5" placeholder="Вы можете оставить ваш коментарий здесь"></textarea>
                <button class="default-btn">Отправить</button>
                <p id="comment-form-settings-caption">Кто может читать?</p>
                <div>
                    <input type="radio" name="comment_visibility" value="all" id="comment-visibility-radio-all" checked>
                    <label class="default-link" for="comment-visibility-radio-all">Все</label>
                    <input type="radio" name="comment_visibility" value="сolleagues" id="comment-visibility-radio-сolleagues">
                    <label class="default-link" for="comment-visibility-radio-сolleagues">Коллеги</label>
                    <input type="radio" name="comment_visibility" value="self" id="comment-visibility-radio-self">
                    <label class="default-link" for="comment-visibility-radio-self">Только я</label>
                </div>
            </fieldset>
            <?php if ($comments->num_rows == 0) : ?>
                <p id="company-no-comments">К этой компании нет коментариев</p>
            <?php endif ?>
            <?php while ($db = $comments->fetch_assoc()) : ?>
                <?php
                if ($db['visibility'] == 'all' || $db['visibility'] == 'self') : ?>
                    <fieldset class="company-comment" visibility="<?= $db['visibility'] ?>">
                        <legend class="company-comment-name"><?= get_name($db['user_id']) ?></legend>
                        <p class="company-comment-visibility">
                            <?php
                            if ($db['visibility'] == 'all') echo 'Видят все';
                            elseif ($db['visibility'] == 'self') echo 'Вижу только я';
                            ?>
                        </p>
                        <p class="company-comment-text"><?= $db['text'] ?></p>
                        <p class="company-comment-date"><?= $db['date'] ?></p>
                    </fieldset>
                <?php endif ?>
            <?php endwhile ?>
        </div>
    </main>
    <script>
        // ID компании
        const COMPANY_ID = '<?= $company['id'] ?>';
    </script>
</body>

</html>