var assert = require('assert');
var fetch = require('../node/fetch/fetch.js');
var chai = require('chai');
var should = chai.should();

var game = {
    team1: 'Atletico Mineiro',
    team2: 'Cruzeiro',
    score: '3-1',
    currentStatus: 'Goal for Atletico Mineiro!'
} 
     

describe('Fetch service', function() {

    describe('runApishould function', function() {
        this.timeout(5000);

        it('should return the correct json if there is any match at this moment', function(done) {
            assert.equal(typeof fetch, 'object');
            assert.equal(typeof fetch.runApi, 'function');
            fetch.runApi(function(data) {
                assert.equal( typeof data, 'object');
                data[0].should.include.keys(
                    'team1', 'team2', 'score', 'currentStatus'
                );
                done();
            })
        })
  
    })

   describe('configMessage function', function(){
   
        it('should return the correct string' , function() {
            assert.equal(typeof fetch, 'object');
            assert.equal(typeof fetch.configMessage, 'function');
            assert.equal(typeof fetch.configMessage(game) , 'string');
            assert.equal(JSON.parse(fetch.configMessage(game)).title, 'Gol do Atletico Mineiro!');
            assert.equal(JSON.parse(fetch.configMessage(game)).body, 'Atletico Mineiro 3-1 Cruzeiro');
            assert.equal(JSON.parse(fetch.configMessage(game)).icon, 'images/ball.png');
        })

    })

    describe('checkGameStatus function', function() {

        it('should check if the team is playing and if yes, send a request', function() {
            assert.equal(typeof fetch.checkGameStatus, 'function');
            
        })
  
    })

 
    describe('sendRequest function', function() {

        it('should send a request', function() {
            assert.equal(typeof fetch.sendRequest, 'function');
        })
  
    })

})


