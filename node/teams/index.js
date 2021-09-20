const logger = require('npmlog');
const dynamodb = require('../lib/dynamodb');
const constants = require('../shared/contants');

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

  const body = JSON.stringify({
    teams,
  });

  return { ...constants.DEFAULT_SUCCESS_RESPONSE, body };
}
