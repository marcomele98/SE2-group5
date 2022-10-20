'use strict'

const { expect } = require('chai');
const { Service } = require('../Services/service');
const service_DAO = require('../Queries/service');

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
    
