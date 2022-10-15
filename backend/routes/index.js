'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const TicketManagement = require('../Services/ticket');

const ticket = new TicketManagement;


//GET /api/test
router.get('/api/hello', (req, res) => {
  let message = {
    message: 'Hello World!'
  }
  return res.status(200).json(message);
});


router.post('/api/ticket', async (req, res) => {
  return ticket.NewTicket(req, res);
});

module.exports = router;
