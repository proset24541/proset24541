<?php
$servername = "78.46.164.171";
$username = "db_29423";
$password = "zhmBjlBdm0yzdOA7VDqo";
$dbname = "db_29423";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST['login'];
    $password = $_POST['password'];

    // Проверка логина и пароля
    $sql = "SELECT * FROM users WHERE login='$login' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Успешный вход. Вы уже подключены.";
    } else {
        echo "Неверный логин/пароль";
    }
}

$conn->close();
?>
