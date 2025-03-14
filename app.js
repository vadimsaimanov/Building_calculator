var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var clientRouter = require('./routes/client');
var clientCardRouter = require('./routes/clientCard');
var carcasRouter = require('./routes/carcas');

var app = express();

// Настройка EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Маршруты
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/client', clientRouter);
app.use('/clientCard', clientCardRouter);
app.use('/carcas', carcasRouter);

// Маршрут для страницы каркаса клиента
app.get('/clientCard/:clientId/carcas', (req, res) => {
  const clientId = req.params.clientId;

  // Здесь можно получить данные клиента из базы данных по clientId
  const client = {
    id: clientId,
    last_name: 'Иванов',
    first_name: 'Иван',
    second_name: 'Иванович',
    adress: 'г. Ульяновск, ул. Тестовая, д. 35-45',
    phone: '+7 (999) 123-45-67'
  };

  // Рендерим страницу carcas.ejs с данными клиента
  res.render('carcas', { client });
});

// Обработка ошибки 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Обработка ошибок
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

module.exports = app;