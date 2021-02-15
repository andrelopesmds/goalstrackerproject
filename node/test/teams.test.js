const assert = require('assert');
const sinon = require('sinon');

const dynamodb = require('../lib/dynamodb');
const index = require('../teams/index');

const team1 = {
  adapterOutputName: 'Corinthians',
  adapterInputName: 'Corinthians',
  name: 'Corinthians',
  id: 2,
  country: 'Brazil',
  sport: 'Football',
};

const team2 = {};

const teamsMock = {
  teams: [
    team1,
    team2,
  ],
};

describe('Teams service', () => {
  it('Should get a response from GET teams correctly', async () => {
    sinon.stub(dynamodb, 'getTeams').returns(teamsMock.teams);
    const teamsResponse = await index.handler();
    const teams = JSON.parse(teamsResponse.body);

    assert.equal(teamsResponse.statusCode, 200);
    assert.equal(teamsResponse.headers['Access-Control-Allow-Credentials'], true);
    assert.equal(teamsResponse.headers['Access-Control-Allow-Origin'], '*');
    assert.deepEqual(teams, teamsMock);
  });
});
