var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var push = require('../node/push/push.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var json = {
    "body" : "Galo x Cruzeiro",
    "title" : "The game started",
    "icon" : "images/ball.png"
}

var msg = JSON.stringify(json);

describe('Push service', function() {
    describe('should respond to post request', function() {
        it('200 - valid post request', function(done) {
            chai.request(push.app)
                .post('/')
                .type('form')
                .send({'team' : 'Galo', 'message' : msg})
                .end(function(err, res) {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    done();
                });
        });

        it('400 - invalid post request', function(done) {
            chai.request(push.app)
                .post('/')
                .type('form')
                .send({'team' : 'Galo'})
                .end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(400);
                    res.type.should.equal('application/json');
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });

    describe('getSubscription function', function() {
        it('should get data from database', async () => {
            assert.equal(typeof push.getSubscriptionsFromDatabase, 'function');
            const result = await push.getSubscriptionsFromDatabase();
            result[0].should.include.keys('endpoint', 'expirationTime',
                                          'key256', 'keyAuth', 'subscribeDate',
                                          'unsubscribeDate');
        });
    });
});
