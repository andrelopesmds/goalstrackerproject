var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var push = require('../node/push/push.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var json = {
    "body" : "Galo x Cruzeiro",
    "title" : "The game has started",
    "icon" : "images/ball.png"
}

var msg = JSON.stringify(json);

var validReq = {'body' : {'message' : msg}};
var invalidReq = {'body' : {'message' : 'wrong format message'}};
var invalidReq2 = {'body' : 'wrong format message'};

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
            console.log("log: ", result);
            result[0].should.include.keys('endpoint', 'expirationTime',
                                          'key256', 'keyAuth', 'subscribeDate',
                                          'unsubscribeDate');
        });
    });

    describe('validateRequest function', function() {
        it('should return the message string if request is valid ', function() {
            assert.equal(typeof push.validateRequest, 'function');
            assert.equal(typeof push.validateRequest(validReq), 'string');
            assert.equal(push.validateRequest(validReq), msg);
        });

        it('should return null if request is not valid ', function() {
            assert.equal(push.validateRequest(invalidReq), null);
            assert.equal(push.validateRequest(invalidReq2), null);
        });
    });

    describe('sendMsg function', function() {
        it('should ... ? ', async () => {
            assert.equal(typeof push.sendMsg, 'function');
            const data = await push.getSubscriptionsFromDatabase();
            const result = await push.sendMsg(data, msg);
            result.forEach(function(item) { expect(item).should.not.be.null; });
        });
    });
});
