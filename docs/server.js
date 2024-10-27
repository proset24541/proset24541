const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
    host: 'e1.aurorix.net',
    user: 'u56480_b2kK6QtzSx',
    password: 'aiPDQ=fNpaEDr^4KRXwX!S6r',
    database: 's56480_siteregistration',
    port: 3306
};

async function initializeDatabase() {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nickname VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);
    await connection.end();
}

app.post('/register', async (req, res) => {
    const { nickname, password } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE nickname = ?', [nickname]);
        if (rows.length > 0) {
            return res.json({ success: false, message: 'Такой ник уже зарегистрирован' });
        }

        await connection.query('INSERT INTO users (nickname, password) VALUES (?, ?)', [nickname, password]);
        res.json({ success: true, message: 'Вы успешно зарегистрировались' });
    } catch (error) {
        res.json({ success: false, message: 'Ошибка при регистрации' });
    } finally {
        await connection.end();
    }
});

app.post('/login', async (req, res) => {
    const { nickname, password } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE nickname = ? AND password = ?', [nickname, password]);
        if (rows.length > 0) {
            return res.json({ success: true, message: 'Вы успешно вошли' });
        }
        res.json({ success: false, message: 'Неверный логин или пароль' });
    } catch (error) {
        res.json({ success: false, message: 'Ошибка при авторизации' });
    } finally {
        await connection.end();
    }
});

initializeDatabase().then(() => {
    app.listen(3000, () => {
        console.log('Сервер работает на порту 3000');
    });
}).catch(console.error);
