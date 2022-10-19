<<<<<<< HEAD
'use strict';

const express = require('express');
const morgan = require('morgan');
const ticket_DAO = require('./Queries/ticket');
const service_DAO = require('./Queries/service');
const counter_DAO = require('./Queries/counter');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/api/tickets', async (req, res) => {
  ticket_DAO.getTicketFromNumber()
  .then(tickets => {res.json(tickets)})
  .catch(() => res.status(500).end);
});

app.get('/api/services', async (req, res) => {
  service_DAO.getServices()
  .then(services => {res.json(services)})
  .catch(() => res.status(500).end);
});

app.get('/api/counters', async (req, res) => {
  counter_DAO.getCounters()
  .then(counters => {res.json(counters)})
  .catch(() => res.status(500).end);
});

app.get('/api/next_service/:counter_id', async (req, res) => {
  service_DAO.getNextServiceToServe(req.params.counter_id)
  .then(services => {res.json(services)})
  .catch(() => res.status(500).end);
});

app.get('/api/next_ticket/:service_id', async (req, res) => {
  ticket_DAO.getNextTicketFromService(req.params.service_id)
  .then(tickets => {res.json(tickets)})
  .catch(() => res.status(500).end);
});

app.put('/api/update_ticket', async (req, res) => {
  ticket_DAO.updateTicket(req.body.ticket,req.body.counter_id)
  .then(tickets => {res.json(tickets)})
  .catch(() => res.status(500).end);
});

app.listen(port, () => "Listening");

=======
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

>>>>>>> abc6fb6c6ab522e2ac9f4adf76d6adf46beda97a
module.exports = app;
