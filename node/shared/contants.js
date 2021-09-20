const complement = process.env.STAGE === 'prod' ? '' : 'dev';

const DEFAULT_SUCCESS_RESPONSE = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': `https://${complement}.goalstracker.info`,
  },
};

module.exports = {
  DEFAULT_SUCCESS_RESPONSE,
};
