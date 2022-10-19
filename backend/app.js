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

app.listen(port, () => "Listening");

//module.exports = app;
