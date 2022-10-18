"use strict"

const { Counter } = require('../Services/counter');
const sqlite = require('sqlite3');
const db = new sqlite.Database('OQM.sqlite', err => { if (err) throw err;});



