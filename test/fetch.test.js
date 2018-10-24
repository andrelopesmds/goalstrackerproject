var assert = require('assert');
var fetch = require('../node/fetch/fetch.js');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var nock = require('nock');
var url = 'http://localhost:3000';

var interceptor = nock(url).post('/').reply(200, {'success' : true});

var match = {
    game : 'Atletico Mineiro 2 x 0 Cruzeiro',
    competition : 'Copa do brasil',
    live : true
}

var matches = [ match ];

describe('Fetch service', function() {
    describe('runApi function', function() {
        this.timeout(5000);

        it('should return an array with the data of the matches', async () => {
            const result = await fetch.matches('brazil', 'atletico-mineiro')
            result[0].should.include.keys('game', 'live', 'competition');
        });
    })

    describe('configMessage function', function() {
        it('should return the correct string in Portuguese', function() {
            assert.equal(typeof fetch, 'object');
            assert.equal(typeof fetch.configMessage, 'function');
            assert.equal(typeof fetch.configMessage(match.game), 'string');
            assert.equal(JSON.parse(fetch.configMessage(match.game, 0)).title,
                         'Começa o jogo!');
            assert.equal(JSON.parse(fetch.configMessage(match.game, 1)).body,
                         'Atletico Mineiro 2 x 0 Cruzeiro');
            assert.equal(JSON.parse(fetch.configMessage(match.game, 2)).icon,
                         'images/time.png');
        })
    })

    describe('checkGameStatus function', function() {
        it('should return a string if there is a new status in the game and null otherwise',
           function() {
               assert.equal(typeof fetch.checkGameStatus, 'function');
               assert.equal(fetch.checkGameStatus(), null);
               assert.equal(typeof fetch.checkGameStatus(matches), 'string');
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
