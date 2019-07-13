const AWS = require('aws-sdk');

const assert = require('assert');
const fetch = require('../fetch.js');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const COUNTRY = process.env.COUNTRY;
const TEAM = process.env.TEAM;

var AWSMock = require('aws-sdk-mock');
AWSMock.setSDKInstance(AWS);

AWSMock.mock('Lambda', 'invoke', function(params, callback) {
    callback(null, {
        statusCode: 201,
        message: 'Message successfully triggered!'
    });
});

const match = {
    game: 'Atletico Mineiro 2 x 0 Cruzeiro',
    competition: 'Copa do brasil',
    live: true
}

var matches = [match];

describe('Fetch service', function() {
    describe('call api', function() {
        it('should return an array with the data of the matches', async () => {
            const result = await fetch.matches(COUNTRY, TEAM);
            expect(result).to.not.be.undefined;
            expect(result).to.have.lengthOf.at.least(1);
            result.forEach(r => {
                r.should.include.keys('game', 'live', 'competition');
            });
        });
    })

    describe('configMessage function', function() {
        it('should return the correct string in Portuguese', function() {
            assert.equal(typeof fetch, 'object');
            assert.equal(typeof fetch.configMessage, 'function');
            assert.equal(typeof fetch.configMessage(match.game), 'string');
            assert.equal(JSON.parse(fetch.configMessage(match.game, 0)).title, 'Começa o jogo!');
            assert.equal(JSON.parse(fetch.configMessage(match.game, 1)).body, 'Atletico Mineiro 2 x 0 Cruzeiro');
            assert.equal(JSON.parse(fetch.configMessage(match.game, 2)).icon, 'images/time.png');
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
            assert.equal(typeof fetch.send, 'function');
            const result = await fetch.send(JSON.stringify({test: 'message'}));
            expect(result).to.not.be.undefined;
            expect(result.statusCode).to.equal(201);
        })
    })
})
