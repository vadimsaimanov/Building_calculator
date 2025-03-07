const db = require('./db');

const login = (login, password) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    login
};