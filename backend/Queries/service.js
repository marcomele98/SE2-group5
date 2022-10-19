"use strict"

const { Service } = require('../Services/service');
const sqlite = require('sqlite3');
const db = new sqlite.Database('OQM.sqlite', err => { if (err) throw err;});

exports.getNextServiceToServe = (counterId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT *, MAX(Required_Time)\
        FROM Service S\
        WHERE Code in (SELECT Service_Code\
        FROM Ticket T\
        WHERE Served_By_Counter IS NULL\
        GROUP BY Service_Code\
        HAVING COUNT(Service_Code) = (SELECT COUNT(T.Service_Code) as Queue_Lenght\
        FROM Ticket T, Served_By_Counter SBC, Counter C\
        WHERE SBC.Counter_Id = C.Id AND SBC.Service_Code = T.Service_Code\
        AND T.Served_By_Counter IS NULL\
        AND C.Id = ?\
        GROUP BY T.Service_Code ORDER BY Queue_Lenght DESC LIMIT 1))';
        db.all(sql, [counterId], (err, row) => {
            if(err)
                reject(err);
            else {
                const service = new Service(row.Code, row.Name, row.Required_Time);
                console.log(service)
                resolve(service);
            }
        });
    });
}

