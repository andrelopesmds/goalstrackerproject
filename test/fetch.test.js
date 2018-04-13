var assert = require('assert');
var fetch = require('../node/fetch/fetch.js');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var nock = require('nock');
var url = 'http://localhost:3000';

var interceptor = nock(url)
                  .post('/')
                  .reply(200, {'success': true});

var game = {
    team1: 'Atletico Mineiro',
    team2: 'Cruzeiro',
    score: '3-1',
    currentStatus: 'Goal for Atletico Mineiro!'
}

var games = [game];

describe('Fetch service', function() {

    describe('runApi function', function() {
        this.timeout(5000);

        it('should return an array with the data of the matches', async () => {
            const result = await fetch.runApi();
            result[0].should.include.keys(
                'team1', 'team2', 'score', 'currentStatus'
            );
        });
    })

   describe('configMessage function', function(){
   
        it('should return the correct string in Portuguese' , function() {
            assert.equal(typeof fetch, 'object');
            assert.equal(typeof fetch.configMessage, 'function');
            assert.equal(typeof fetch.configMessage(game) , 'string');
            assert.equal(JSON.parse(fetch.configMessage(game)).title, 'Gol do Atletico Mineiro!');
            assert.equal(JSON.parse(fetch.configMessage(game)).body, 'Atletico Mineiro 3-1 Cruzeiro');
            assert.equal(JSON.parse(fetch.configMessage(game)).icon, 'images/ball.png');
        })

    })

    describe('checkGameStatus function', function() {

       it('should return a string if there is a new status in the game and null otherwise', function() {
            assert.equal(typeof fetch.checkGameStatus, 'function');
            assert.equal(fetch.checkGameStatus(), null);    // invalid entry data
            assert.equal(typeof fetch.checkGameStatus(games), 'string' );  
        })
  
    })

 
    describe('sendRequest function', function() {

        it('should send a request', async () => {
            assert.equal(typeof fetch.sendRequest, 'function');
            const result = await fetch.sendRequest('some message');
            expect(result).to.equal("'success':true");
        })
  
    })

})

