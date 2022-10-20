'use strict'

const { expect } = require('chai');
const { Counter } = require('../Services/counter');
const counter_DAO = require('../Queries/counter');

let mycounter = [];
mycounter[0] = new Counter(1, 'A');
mycounter[1] = new Counter(1, 'B');
testGetCounters(mycounter[1]);


function testGetCounters(counter) {
    test('get counter', async() => {
       
        const res = await counter_DAO.getCounters(counter.Counter_Id, counter.Service_Code);
        expect(res.Counter_Id).to.equal(counter.Counter_Id);
        expect(res.Service_Code).to.equal(counter.Service_Code);
        
       
        
    })
}


