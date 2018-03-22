var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app/app.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var validSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP","expirationTime":null,"keys":{"p256dh":"BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=","auth":"GS_k7K70ihQtA1GvfAZ8wA=="}};

var invalidSubscription = {"end":"https://fcm.googleapis.com/fcm/send/f0WEtgCFsks:APA91bE8uTa15e4A-VX1O4OvynXOd8SxgrjQbRggP34jCn8reIIaVAEie7LSEDniALhNcwYwuV3JsKfEjx91N8BzRlgfQTswpY_W1slM-JIpMyHaz2HCwxKenBzTCwHgvSocdPSMk3SP","expirationTime":null,"keys":{"p256dh":"BLt_51HXUHl0FQ1Zc8fFaFKWMX0OJt5uu55dVb89cEeWMt3jBbBNqE7nrwIl9t4H1e7scL6KYSQNMbXrIr_hXb8=","auth":"GS_k7K70ihQtA1GvfAZ8wA=="}};


describe('API - Save subscription service', function() {

  it('should response with status 200 after valid subscription', function(done){
    chai.request(server)
      .post('/api/save-subscription/')
      .send(validSubscription)
      .end(function(err, res){
        res.should.have.status(200);
        expect(err).to.be.null;
        done();
      });
  });

  it('should response with json after valid subscription', function(done){
    chai.request(server)
      .post('/api/save-subscription/')
      .send(validSubscription)
      .end(function(err, res){
        expect(res).to.be.json;
        done();
      });
  });

  it('should response with status 400 after invalid subscription', function(done){
    chai.request(server)
      .post('/api/save-subscription/')
      .send(invalidSubscription)
      .end(function(err, res){
        expect(err).to.be.null;
        res.should.have.status(400);
        done();
      });
  });



});



