const AWS = require('aws-sdk');

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
  console.log(res);
  return res;
};

module.exports = {
  callPushHandler,
};
