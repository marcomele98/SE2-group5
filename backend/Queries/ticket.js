"use strict"

const db = require('./DAO');

exports.createNewTicket = (data) => {
    const sql = 'INSERT INTO Ticket (Date, Service_Code, Daily_Number) VALUES(?, ?, ?)';
    return db.run(sql, [data.Date, data.Service_Code, data.Daily_Number]);
}

exports.updateTicket = (data) => {
    const updateQuery = 'UPDATE Ticket SET Served_By_Counter = ? WHERE Date =? AND Service_Code = ? AND Daily_Number = ?';
    return db.run(updateQuery, [data.Served_By_Counter, data.Date, data.Service_Code, data.Daily_Number]);
}

exports.getLastNumberTicketForService = (data) => {
    const sql = 'SELECT MAX(Daily_Number) as TicketNumber FROM Ticket WHERE Date = ? AND Service_Code = ?';
    return db.get(sql, [data.Date, data.Service_Code]);
}

