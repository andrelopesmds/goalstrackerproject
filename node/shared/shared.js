const AWS = require('aws-sdk');
const logger = require('npmlog');

const SNS = new AWS.SNS();
const { snsTopicArn } = process.env;

const callPushHandler = async (obj, subscription) => {
  const message = JSON.stringify({
    obj, subscription,
  });

  const params = {
    Message: message,
    TopicArn: snsTopicArn,
  };

  const res = await SNS.publish(params).promise();
  logger.info(res);
  return res;
};

module.exports = {
  callPushHandler,
};
