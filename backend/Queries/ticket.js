"use strict"

const { Ticket } = require('../Services/ticket');
const sqlite = require('sqlite3');
const db = new sqlite.Database('OQM.sqlite', err => { if (err) throw err;});

exports.createNewTicket = (data) => {
    const sql = 'INSERT INTO Ticket (Date, Service_Code, Daily_Number) VALUES(?, ?, ?)';
    return db.run(sql, [data.Date, data.Service_Code, data.Daily_Number]);
}

exports.updateTicket = (ticket, counter_id) => {
    const updateQuery = 'UPDATE Ticket SET Served_By_Counter = ? WHERE Date =? AND Service_Code = ? AND Daily_Number = ?';
    return db.run(updateQuery, [counter_id, ticket.Date, ticket.Service_Code, ticket.Daily_Number]);
}

exports.getTicketFromNumber = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from Ticket';
        db.all(sql, [], (err, rows) => {
            if(err)
                reject(err);
            else {
                const tickets = rows.map(row => new Ticket(row.Date, row.Service_Code, row.Daily_Number, row.Served_By_Counter));
                console.log(tickets);
                resolve(tickets);
            }
        });
    });
}

exports.getNextTicketFromService = (service_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Ticket\
        WHERE Served_By_Counter IS NULL AND Service_Code = ?\
        ORDER BY Daily_Number LIMIT 1';
        db.all(sql, [service_id], (err, rows) => {
            if(err)
                reject(err);
            else {
                const tickets = rows.map(row => new Ticket(row.Date, row.Service_Code, row.Daily_Number, row.Served_By_Counter));
                console.log(tickets);
                resolve(tickets);
            }
        });
    });
}