'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const subscriptionsTable = 'SubscriptionsTable';

async function saveSubscription(subscription) {
  subscription.subscribeDate = new Date().toISOString();
  subscription.unsubscribeDate = null;
  
  const parameters = {
    TableName: subscriptionsTable,
    Item: subscription,
  };

  try {
    await docClient.put(parameters).promise();
    console.log(`Subscription saved: ${JSON.stringify(subscription)}`);
  } catch (error) {
    console.log(`Error when subscribing user: ${JSON.stringify(error)}`);
    throw error;
  }
}

module.exports = {
    saveSubscription,
};