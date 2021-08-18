const logger = require('npmlog');
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
    logger.info(`Error when fetching teams: ${JSON.stringify(error)}`);
    throw error;
  }

  return response;
};

async function getTeams() {
  const attributestToShow = ['id', 'name', 'sport', 'country'];
  const teams = await dynamodb.getTeams(attributestToShow);

  const response = SUCCESS_RESPONSE;
  response.body = JSON.stringify({
    teams,
  });

  return response;
}
