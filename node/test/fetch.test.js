var assert = require('assert');
var C = require('../fetch/fetch.js');

var game = {
  team1: 'Atletico Mineiro',
  team2: 'Cruzeiro',
  score: '3-1',
  currentStatus: 'Goal for Atletico Mineiro!'
  }      

describe('Fetch service', function(){

  describe('should have a config message method', function(){

    it('which is a function', function(){
      assert.equal(typeof C, 'object');
      assert.equal(typeof C.configMessage, 'function');
    })
   
    it('should return the correct string' , function(){
      assert.equal(typeof C.configMessage(game) , 'string');
      assert.equal(JSON.parse(C.configMessage(game)).title, 'Gol do Atletico Mineiro!');
      assert.equal(JSON.parse(C.configMessage(game)).body, 'Atletico Mineiro 3-1 Cruzeiro');
      assert.equal(JSON.parse(C.configMessage(game)).icon, 'images/ball.png');
    })

  })

})
