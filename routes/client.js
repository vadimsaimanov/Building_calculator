var express = require('express');
var router = express.Router();
const db = require('../db');
const queries = require('../queries');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const clients = await queries.getClients(1);  // Передаем manager_id, например, 1
        res.render('client', { title: 'client', clients });
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).send('Ошибка сервера');
    }
});
router.post('/add', async (req, res) => {
    try{
        const {lastName, firstName, middleName, phone, email, address, managerId} = req.body;

        const result = await queries.addClient(lastName, firstName, middleName, phone, email, address, managerId);

        if (result.affectedRows > 0) {  // Если была добавлена хотя бы одна строка
            res.json({ success: true, message: 'Клиент успешно добавлен!' });
        } else {
            res.json({ success: false, message: 'Не удалось добавить клиента.' });
        }
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).send('Ошибка сервера');
    }

});

module.exports = router;
