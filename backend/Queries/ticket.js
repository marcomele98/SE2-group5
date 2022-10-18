"use strict"

const { Ticket } = require('../Services/ticket');
const sqlite = require('sqlite3');
const db = new sqlite.Database('OQM.sqlite', err => { if (err) throw err;});