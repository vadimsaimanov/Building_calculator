const db = require('./db');

const login = async (login, password) => {
    const [results] = await db.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password]);
    return results;
};
const getClients = async (manager_id) => {
    const [results] = await db.query('SELECT * FROM customers WHERE users_id = ?', [manager_id]);
    return results;
};
const addClient = async (secondname, name, lastname, phone, email, adress, manager_id) => {
    const [results] = await db.query(
        'INSERT INTO customers (last_name, first_name, second_name, phone, `e-mail`, adress, users_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [secondname, name, lastname, phone, email, adress, manager_id]
    );
    return results;
};
const getClientById = async (clientId) => {
    const [results] = await db.query('SELECT * FROM customers WHERE id = ?', [clientId]);
    return results;
};

module.exports = {
    login,
    addClient,
    getClients,
    getClientById
};