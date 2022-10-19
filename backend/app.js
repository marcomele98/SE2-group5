'use strict';

const express = require('express');
const morgan = require('morgan');
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

const ServiceManagerClass = require('./Services/service');

const ServiceManager = new ServiceManagerClass;

//POST /api/ticket
app.post('/api/ticket', async (req, res) => {
  return ticket.NewTicket(req, res);
});


//GET /api/services 
app.get('/api/services', async (req, res) => {
  try{
    res.status(200).json(await ServiceManager.getAllServices());
  } catch {
    res.status(503).end();
  }
})

app.listen(port, () => "Listening");