var express = require('express');
var router = express.Router();
const db = require('../db');
const queries = require('../queries');

/* GET home page. */
router.get('/:id', async function (req, res, next) {
    const clientId = req.params.id;

    try {
        const [client] = await queries.getClientById(clientId);

        if (client) {
            res.render('clientCard', {title: 'Информация о клиенте', client});
        } else {
            res.status(404).send('Клиент не найден');
        }
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).send('Ошибка сервера');
    }
});

router.post('/', async (req, res) => {

    // const { login, password } = req.body;
    //
    // //const login = "ivanov";
    // //const password = "password";
    //
    //
    // const results = await queries.login(login, password);
    //
    // console.log(results);
    //
    // if (results.length > 0) {
    //     res.json({ success: true, message: 'Успешный вход', user: results[0] });
    // } else {
    //     res.json({ success: false, message: 'Неверный логин или пароль' });
    // }


});

module.exports = router;
