"use strict"

const db = require('./DAO');

exports.getAllServicesFromBD = (data) => {
    const sql = 'SELECT  * FROM Service';
    return db.all(sql);
}



