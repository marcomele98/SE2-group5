'use strict'

const { expect } = require('chai');
const { Service } = require('../Services/service');
const service_DAO = require('../Queries/service');
//const dbFunctions = require('../db_functions')npm install —save-dev jest
/*app.get('/api/next_service/:counter_id', async (req, res) => {
    service_DAO.getNextServiceToServe(req.params.counter_id)
    .then(services => {res.json(services)})
    .catch(() => res.status(500).end);
  }); */

  /*
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
 */

/*exports.getServices = () => {
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
*/




/*exports.getNextServiceToServe = (counter_id) => {
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
        db.all(sql, [counter_id], (err, rows) => {
            if(err)
                reject(err);
            else {
                const services = rows.map(row => new Service(row.Code, row.Name, row.Required_Time));
                console.log(services)
                resolve(services);
            }
        });
    }); 
    */
    let myservices = [];
    myservices[0] = new Service("A", "Send parcel", 3);
    myservices[1] = new Service("B", "Send letter", 2);

    let mynextservices = [];
    mynextservices[0] = new Service("A", "Send parcel", 3);



    testGetNextServiceToServe(mynextservices[0]);
    testGetServices(myservices[1]);

    function testGetServices(service) {
        test('get service', async() => {
           
            const res = await service_DAO.getServices(service.Code, service.Name, service.Required_Time );
            expect(res.Code).to.equal(service.Code);
            expect(res.Name).to.equal(service.Name);
            expect(res.Required_Time).to.equal(service.Required_Time);
           
            
        })
    }

    
    function testGetNextServiceToServe(service) {
        test('get next service to be served', async() => {
           
            const res = await service_DAO.getNextServiceToServe(service.Code, service.Name, service.Required_Time );
            expect(res.Code).to.equal(service.Code);
            expect(res.Name).to.equal(service.Name);
            expect(res.Required_Time).to.equal(service.Required_Time);
           
            
        })
    }
    
