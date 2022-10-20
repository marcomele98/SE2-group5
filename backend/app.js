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


const TicketManagement = require('./Services/ticket');

const ticket = new TicketManagement;


//POST /api/ticket
app.post('/api/ticket', async (req, res) => {
  return ticket.NewTicket(req, res);
});


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


