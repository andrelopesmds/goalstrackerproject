const dynamodb = require('../lib/dynamodb');

const SUCCESS_RESPONSE = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
};

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

  const response = SUCCESS_RESPONSE;
  response.body = JSON.stringify({
    teams,
  });

  return response;
}
