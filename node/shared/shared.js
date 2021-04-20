const aws = require('aws-sdk');

const lambda = new aws.Lambda();
const { pushFunction } = process.env;

const callPushHandler = async (obj, subscription) => {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      obj,
      subscription,
    });

    const params = {
      FunctionName: pushFunction,
      InvocationType: 'Event',
      Payload: payload,
    };

    lambda.invoke(params, (err) => {
      if (err) {
        console.log(`Error when sending push notification. Params: ${JSON.stringify(params)}`);
        throw err;
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = {
  callPushHandler
}