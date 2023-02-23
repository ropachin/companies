<?php
// Очистить cookie
setcookie('user-token', '',  -1, '/');
header('location: /');
