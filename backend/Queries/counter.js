"use strict"


const { Counter } = require('../Services/counter');
const sqlite = require('sqlite3');
const db = new sqlite.Database('OQM.sqlite', err => { if (err) throw err;});

exports.getCounters = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from Served_By_Counter';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const counters = rows.map(row => new Counter(row.Counter_Id, row.Service_Code));
                resolve(counters);
            }
        });
    });
}




