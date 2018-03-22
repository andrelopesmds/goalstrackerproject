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

    it('should be a function', function(){
      assert.equal(typeof C, 'object');
      assert.equal(typeof C.configMessage, 'function');
    })
   
    it('should return a string' , function(){
       assert.equal(typeof C.configMessage(game) , 'string');
    })
    
    it("should return title message", function(){  
      assert.equal(JSON.parse(C.configMessage(game)).title, 'Gol do Atletico Mineiro!');
    })

    it("should return body message", function(){
      assert.equal(JSON.parse(C.configMessage(game)).body, 'Atletico Mineiro 3-1 Cruzeiro');
    })

    it("should return icon path", function(){
      assert.equal(JSON.parse(C.configMessage(game)).icon, 'images/ball.png');
    })

  })

})
