const schemas = require('./schemas.js');

async function saveSubscription(subscription) {
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
  const data = await schemas.SubscriptionsModel.queryOne(queryFilter).exec();
  return data;
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
  deleteSubscription,
  getSubscriptions,
  saveEventList,
  getEvents,
  getTeams,
};
