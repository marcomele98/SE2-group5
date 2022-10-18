"use strict"

import { Database } from 'sqlite3';
const db = new Database('OQM.sqlite', (err) => {
    if (err) throw err;
});

exports.getNextServiceToServe= () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT *, MAX(Required_Time)\
        FROM Service\
        WHERE Code in (SELECT Service_Code\
        FROM Ticket T\
        WHERE Served_By_Counter IS NULL\
        GROUP BY Service_Code\
        HAVING COUNT(Service_Code) = (SELECT COUNT(Service_Code) as Queue_Lenght\
        FROM Ticket\
        WHERE Served_By_Counter IS NULL\
        GROUP BY Service_Code ORDER BY Queue_Lenght DESC LIMIT 1))';
        db.all(sql, [], (err, row) => {
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

