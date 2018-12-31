var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../node/app/app.js');
var should = chai.should();
var expect = chai.expect;
var nock = require('nock');
var url = 'http://localhost:3000';

var interceptor = nock(url).post('/').reply(200, {
    'success': true
});

chai.use(chaiHttp);

var validSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP",
    "expirationTime": null,
    "keys": {
        "p256dh": "BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=",
        "auth": "GS_k7K70ihQtA1GvfAZ8wA=="
    }
};

var invalidSubscription = {
    "end": "https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP",
    "expirationTime": null,
    "keys": {
        "p256dh": "BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=",
        "auth": "GS_k7K70ihQtA1GvfAZ8wA=="
    }
};

describe('App service', function() {
    it('should respond to post valid subscription', function(done) {
        chai.request(server)
            .post('/api/save-subscription/')
            .send(validSubscription)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.success.should.equal(true);
                done();
            });
    });

    it('should respond to post invalid subscription', function(done) {
        chai.request(server)
            .post('/api/save-subscription/')
            .send(invalidSubscription)
            .end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(400);
                res.type.should.equal('application/json');
                res.body.success.should.equal(false);
                done();
            });
    });

    it('should respond to get statistics', function(done) {
        chai.request(server).get('/statistics/').end(function(err, res) {
            // there should be no errors
            should.not.exist(err);
            // there should be a 200 status code
            res.should.have.status(200);
            // response should be json
            res.type.should.equal('application/json');
            // JSON response body should have a key-value pair of
            // {"status":"success"}
            res.body.status.should.equal('success');
            // the first obj in dates array should have the right keys
            res.body.data[0].should.include.keys('subscribeDate', 'unsubscribeDate');

            done();
        });
    });
});