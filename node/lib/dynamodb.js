const schemas = require('./schemas.js');

async function saveSubscription(subscription) {
  subscription.expirationTime = 'test string';
  subscription.unsubscribeDate = 'test string';

  const subscriptionAttribute = new schemas.SubscriptionsModel(subscription);

  await subscriptionAttribute.save();
  console.log(`Subscription saved: ${JSON.stringify(subscription)}`);
}

async function deleteSubscription(subscription) {
  const completeSubscription = await getSubscription(subscription.endpoint);
  completeSubscription.unsubscribeDate = new Date().toISOString();

  const subscriptionAttribute = new schemas.SubscriptionsModel(completeSubscription);

  await subscriptionAttribute.save();
  console.log(`Subscription deleted: ${JSON.stringify(subscription)}`);
}

async function getSubscription(endpoint) {
  const queryFilter = {
    endpoint,
  };

  const subscription = await schemas.SubscriptionsModel.queryOne(queryFilter).exec();
  console.log(`Subscription loaded: ${JSON.stringify(subscription)}`);
  return subscription;
}

async function getSubscriptions() {
  const unsubscribedUsersAttribute = 'unsubscribeDate';
  const filter = {
    FilterExpression: `attribute_not_exists(${unsubscribedUsersAttribute})`,
    ScanIndexForward: false,
    ConsistentRead: false,
  };

  const subscriptions = await schemas.SubscriptionsModel.scan(filter).all().exec();
  console.log(`Subscriptions loaded: ${JSON.stringify(subscriptions)}`);
  return subscriptions;
}

async function saveEventList(events) {
  const listEvents = [];
  events.forEach((event) => {
    const eventAttribute = new schemas.EventsModel(event);
    listEvents.push(eventAttribute);
  });

  await schemas.EventsModel.batchPut(listEvents);
  console.log(`Events saved: ${JSON.stringify(listEvents)}`);
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
    ProjectionExpression: 'team1, team2, score, currentStatus, team1Id, team2Id',
    ScanIndexForward: false,
    ConsistentRead: false,
  };

  const events = await schemas.EventsModel.scan(filter).all().exec();
  console.log(`Events loaded: ${JSON.stringify(events)}`);
  return events;
}

async function getTeams() {
  const teams = await schemas.TeamsModel.scan().all().exec();
  console.log(`Teams loaded: ${JSON.stringify(teams)}`);
  return teams;
}

module.exports = {
  saveSubscription,
  deleteSubscription,
  getSubscriptions,
  saveEventList,
  getEvents,
  getTeams,
};
