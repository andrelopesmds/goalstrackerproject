'use strict';

const schemas = require('./schemas.js');

async function saveSubscription(subscription) {
  const subscriptionAttribute = new schemas.SubscriptionsModel(subscription);

  await subscriptionAttribute.save();
  console.log(`Subscription saved: ${JSON.stringify(subscription)}`);
}

async function getSubscriptions() {
  const unsubscribedUsersAttribute = 'unsubscribeDate';
  const filter = {
    FilterExpression: `attribute_not_exists(${unsubscribedUsersAttribute})`,
    ScanIndexForward: false,
    ConsistentRead: false,
  };

  const data = await schemas.SubscriptionsModel.scan(filter).all().exec();
  console.log('Data loaded');
  console.log(data);
  return data;
}

async function saveEvent(event) {
  const eventAttribute = new schemas.EventsModel(event);

  await eventAttribute.save();
  console.log(`Event saved: ${JSON.stringify(event)}`);
}

async function getEvents(minutesToTrack) {
  const timestamp = (new Date((new Date().getTime()) - minutesToTrack * 60000)).toISOString();
  const filter = {
    ExpressionAttributeNames: {
      '#timestamp': 'timestamp',
    },
    ExpressionAttributeValues: {
      ':timestamp': timestamp,
    },
    FilterExpression: '#timestamp > :timestamp',
    ProjectionExpression: 'team1, team2, score, currentStatus',
    ScanIndexForward: false,
    ConsistentRead: false,
  };

  const data = await schemas.EventsModel.scan(filter).all().exec();
  console.log('Data loaded');
  console.log(data);
  return data;
}

async function getTeams() {
  const data = await schemas.TeamsModel.scan().all().exec();
  return data;
}

module.exports = {
  saveSubscription,
  getSubscriptions,
  saveEvent,
  getEvents,
  getTeams,
};
