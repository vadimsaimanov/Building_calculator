const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',     // Хост БД (обычно localhost)
    user: 'root',          // Имя пользователя БД
    password: '646464',  // Пароль к БД
    database: 'stroi_calc'     // Имя базы данных
});

// connection.connect((err) => {
//     if (err) {
//         console.error('Ошибка подключения к БД:', err);
//         return;
//     }
//     console.log('Успешное подключение к базе данных!');
// });

module.exports = connection;
