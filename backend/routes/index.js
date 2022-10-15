'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const TicketManagement = require('../Services/ticket');

const ticket = new TicketManagement;


router.post('/api/ticket', async (req, res) => {
  return ticket.NewTicket(req, res);
});

const ServiceManagerClass = require('../Services/service');

const ServiceManager = new ServiceManagerClass;

//GET /api/services 
router.get('/api/services', async (req, res) => {
  try{
    res.status(200).json(await ServiceManager.getAllServices());
  } catch {
    res.status(503).end();
  }
})

module.exports = router;
