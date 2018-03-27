var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../push/push.js');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var json = {
    "body": "Galo x Marias",
    "title": "The game started",
    "icon": "images/ball.png"
}

var msg = JSON.stringify(json);


describe('Push service', function() {

  describe('should response with correct status after request', function(){

  it('200 - valid post request', function(done){
    chai.request(server)
      .post('/')
      .type('form')
      .send({ 'team': 'Galo', 'message' : msg  })
      .end(function(err, res){
        expect(err).to.be.null;
        res.should.have.status(200);
       done();
      });
  });

  it('400 - invalid post request', function(done){
    chai.request(server)
      .post('/')
      .type('form')
      .send({ 'team': 'Galo' })
      .end(function(err, res){
        expect(err).to.be.null;
        res.should.have.status(400);
       done();
      });
  });

});


});

