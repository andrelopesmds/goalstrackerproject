'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const subscriptionsTable = 'SubscriptionsTable';
const eventsTable = 'EventsTable';

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

async function saveEvent(event) {
  event.timestamp = new Date().toISOString();
  
  const parameters = {
    TableName: eventsTable,
    Item: event,
  };

  try {
    await docClient.put(parameters).promise();
    console.log(`Event saved: ${JSON.stringify(event)}`);
  } catch (error) {
    console.log(`Error when saving event: ${JSON.stringify(error)}`);
    throw error;
  }
}

async function getEvents(minutesToTrack) {
  const timestamp = (new Date((new Date().getTime()) - minutesToTrack * 60000)).toISOString();

  const params = {
    TableName: eventsTable,
    ExpressionAttributeNames: {
      '#timestamp': 'timestamp',
    },
    ExpressionAttributeValues: {
      ':timestamp': timestamp,
    },
    FilterExpression: "#timestamp > :timestamp",
    ProjectionExpression: 'team1, team2, score, currentStatus',
    ScanIndexForward: false,
    ConsistentRead: false,
  };

  let data = null;
  try {
    const result = await docClient.scan(params).promise();
    data = result.Items;
  } catch (error) {
    console.log(`Error when getting events: ${JSON.stringify(error)}`);
    throw error;
  }

  return data;
}

module.exports = {
    saveSubscription,
    saveEvent,
    getEvents,
};