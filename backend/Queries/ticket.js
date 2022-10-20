"use strict"

const sqlite = require('sqlite3');
const db = new sqlite.Database('OQM.sqlite', err => { if (err) throw err;});

const db1 = require('./DAO');

function Ticket (date, service_code, daily_number, served_by_counter) {
    this.date = date;
    this.service_code = service_code;
    this.daily_number = daily_number;
    this.served_by_counter = served_by_counter;
}

exports.createNewTicket = async (data) => {
    const sql = 'INSERT INTO Ticket (Date, Service_Code, Daily_Number) VALUES(?, ?, ?)';
    return db1.run(sql, [data.Date, data.Service_Code, data.Daily_Number]);
}


exports.updateTicket = (ticket, counter_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Ticket SET Served_By_Counter = ? WHERE Date =? AND Service_Code = ? AND Daily_Number = ?';
        db.all(sql, [counter_id, ticket.date, ticket.service_code, ticket.daily_number], (err, rows) => {
            if(err)
                reject(err);
            else {
                const tickets = rows.map(row => new Ticket(row.Date, row.Service_Code, row.Daily_Number, row.Served_By_Counter));
                resolve(tickets);
            }
        });
    });
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


exports.getLastNumberTicketForService = async (data) => {
    const sql = 'SELECT MAX(Daily_Number) as TicketNumber FROM Ticket WHERE Date = ? AND Service_Code = ?';
    return db1.get(sql, [data.Date, data.Service_Code]);
}



