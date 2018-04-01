var assert = require('assert');
var fetch = require('../fetch/fetch.js');

var game = {
    team1: 'Atletico Mineiro',
    team2: 'Cruzeiro',
    score: '3-1',
    currentStatus: 'Goal for Atletico Mineiro!'
}      

describe('Fetch service', function() {

    describe('should have a config message method', function() {

        it('which is a function', function() {
            assert.equal(typeof fetch, 'object');
            assert.equal(typeof fetch.configMessage, 'function');
        })
   
        it('should return the correct string' , function() {
            assert.equal(typeof fetch.configMessage(game) , 'string');
            assert.equal(JSON.parse(fetch.configMessage(game)).title, 'Gol do Atletico Mineiro!');
            assert.equal(JSON.parse(fetch.configMessage(game)).body, 'Atletico Mineiro 3-1 Cruzeiro');
            assert.equal(JSON.parse(fetch.configMessage(game)).icon, 'images/ball.png');
        })

    })
  
    describe('should have a runApi method', function() {

        it('which is a function', function() {
            assert.equal(typeof fetch, 'object');
            assert.equal(typeof fetch.runApi, 'function');
        })
  
    })

    describe('should have a sendRequest method', function() {

        it('which is a function', function() {
            assert.equal(typeof fetch.sendRequest, 'function');
        })
  
    })

})
