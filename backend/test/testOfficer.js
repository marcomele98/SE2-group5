'user strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const app = require('../app');
var agent = chai.request.agent(app);
const { Service } = require('../Services/service');
const { assert } = require("chai");


let myservices = [];
myservices[0] = new Service("A", "Send parcel", 3);
myservices[1] = new Service("B", "Send letter", 2);

let mynextservices = [];
mynextservices[0] = new Service("A", "Send parcel", 3);


function testGetServices(agent, size, expCode) {
    describe(' get /api/services', function() {
        it('list all services', function(done) {
            agent.get('/api/services')
                .then(function(res) { 
                    res.should.have.status(expCode);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(size);
                    done();
                }).catch(err => done(err));
        });
    });
}
function testGetNextServiceToServe(agent, size, expCode) {
    describe(' get/api/next_service/:counter_id', function() {
        it('list all services', function(done) {
            agent.get('/api/next_service/:counter_id')
                .then(function(res) { 
                    res.should.have.status(expCode);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(size);
                    done();
                }).catch(err => done(err));
        });
    });
}
function testServices() {
    describe('Test services API', () => {
       
        testGetServices(agent, 2, 200);
        testGetNextServiceToServe(agent,1,200)
       
    })
}

testServices();