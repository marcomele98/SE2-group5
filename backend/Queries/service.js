"use strict"

import { Database } from 'sqlite3';
const db = new Database('OQM.sqlite', (err) => {
    if (err) throw err;
});



