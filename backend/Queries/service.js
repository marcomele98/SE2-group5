"use strict"

const { Service } = require('../Services/service');
const sqlite = require('sqlite3');
const db = new sqlite.Database('OQM.sqlite', err => { if (err) throw err;});

exports.getServices = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from Service';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const services = rows.map(row => new Service(row.Code, row.Name, row.Required_Time));
                console.log(services)
                resolve(services);
            }
        });
    });
}



