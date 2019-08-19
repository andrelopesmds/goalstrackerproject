const AWS    = require('aws-sdk');
const assert = require('assert');
const fetch  = require('../fetch.js');
const chai   = require('chai');
const expect = chai.expect;
const should = chai.should();
const constants = require('./constants.js');

var AWSMock = require('aws-sdk-mock');
AWSMock.setSDKInstance(AWS);

AWSMock.mock('Lambda', 'invoke', function(params, callback) {
    callback(null, {
        statusCode: 201,
        message: 'Message successfully triggered!'
    });
});

describe('Fetch service', function() {
    it('should import module/function/constants correctly', function() {
        assert.equal(typeof fetch, 'object');
        assert.equal(typeof fetch.runApi, 'function');
        assert.equal(typeof fetch.configMessage, 'function');
        assert.equal(typeof fetch.checkGameStatus, 'function');
        assert.equal(typeof fetch.sendRequest, 'function');
        assert.equal(typeof fetch.checkTeam, 'function');
        assert.equal(typeof constants, 'object');
        assert.equal(typeof constants.matches, 'object');
        assert.equal(typeof constants.matches.finished, 'object');
        expect(constants.matches.finished).to.have.lengthOf.at.least(1);
    });

    it('should call an api which returns the array of results', async () => {
        const results = await fetch.runApi();
        assert.equal(typeof results, 'object');
        expect(results).to.have.lengthOf.at.least(1);
        results.forEach(result => {
            result.should.include.keys('team1', 'team2', 'score', 'currentStatus');
        });
    });

    it('should config message correctly', function () {
        constants.matches.finished.forEach(match => {
            const result = fetch.configMessage(match);
            assert.equal(typeof result, 'string');

            const parsed = JSON.parse(result);
            parsed.should.include.keys('body', 'icon', 'title');
            assert.equal(parsed.title, match.currentStatus);
            assert.equal(parsed.body, `${match.team1} ${match.score} ${match.team2}`);
       });

    });

    it('should return a string if the game has a new event and null otherwise', function() {
        const result = fetch.checkGameStatus(constants.matches.finished);
        assert.equal(typeof result, 'string');

        const parsed = JSON.parse(result);
        parsed.should.include.keys('body', 'icon', 'title');
        assert.equal(parsed.title, constants.matches.finished[0].currentStatus);
        assert.equal(parsed.body, `${constants.matches.finished[0].team1} ${constants.matches.finished[0].score} ${constants.matches.finished[0].team2}`);
    });

    it('should return success after a request to the push service', async () => {
        const result = await fetch.sendRequest();
        assert.equal(result.statusCode, 201);
        assert.equal(result.message, 'Message successfully triggered!')
    });

    it('should check the name of the team', function() {
        constants.team.corrects.forEach(team => {
            const result = fetch.checkTeam(team);
            expect(result).to.be.true;
        });
    });
});
