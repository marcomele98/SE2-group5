'user strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const app = require('../app');
var agent = chai.request.agent(app);
const { Counter } = require('../Services/counter');
const { assert } = require("chai");

let mycounter = [];
mycounter[0] = new Counter(1, 'A');
mycounter[1] = new Counter(1, 'B');

function testGetCounters(agent, size, expCode) {
    describe(' get /api/counters', function() {
        it('list all counters', function(done) {
            agent.get('/api/counters')
                .then(function(res) { 
                    res.should.have.status(expCode);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(size);
                    done();
                }).catch(err => done(err));
        });
    });
}
function testCounters() {
    describe('Test services API', () => {
       
        testGetCounters(agent, 3, 200);
    

    })
}
testCounters();