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

    // Проверка на существование логина
    $sql = "SELECT * FROM users WHERE login='$login'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Данный логин уже занят";
    } else {
        // Вставка нового пользователя
        $sql = "INSERT INTO users (login, password) VALUES ('$login', '$password')";
        if ($conn->query($sql) === TRUE) {
            echo "Успешная регистрация, $login.";
        } else {
            echo "Ошибка: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
