'use strict';

const dynamodb = require('../lib/dynamodb');

function createResponse(teams) {
  return {
    body: JSON.stringify({
      teams: teams,
    }),
  };
}

module.exports.handler = async () => {
  let response;
  try {
    response = await getTeams();
  } catch (error) {
    console.log(`Error when fetching teams: ${JSON.stringify(error)}`);
    throw error;
  }

  return response;
};

async function getTeams() {
  const teams = await dynamodb.getTeams();

  return createResponse(teams);
}
