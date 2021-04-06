const { Team, Subscription, Event } = require('./schemas.js');

const saveSubscription = async (subscription) => {
  delete subscription.expirationTime;
  delete subscription.unsubscribeDate;

  const subscriptionAttribute = new Subscription(subscription);

  await subscriptionAttribute.save();
  console.log(`Subscription saved: ${JSON.stringify(subscription)}`);
}

const deleteSubscription = async (subscription) => {
  const completeSubscription = await getSubscription(subscription.endpoint);
  completeSubscription.unsubscribeDate = new Date().toISOString();

  const subscriptionAttribute = new Subscription(completeSubscription);

  await subscriptionAttribute.save();
  console.log(`Subscription deleted: ${JSON.stringify(subscription)}`);
}

const getSubscription = async (endpoint) => {
  const queryFilter = {
    endpoint,
  };

  const subscription = await Subscription.queryOne(queryFilter).exec();
  console.log(`Subscription loaded: ${JSON.stringify(subscription)}`);
  return subscription;
}

const getSubscriptions = async () => {
  const unsubscribedUsersAttribute = 'unsubscribeDate';
  const filter = {
    FilterExpression: `attribute_not_exists(${unsubscribedUsersAttribute})`,
    ScanIndexForward: false,
    ConsistentRead: false,
  };

  const subscriptions = await Subscriptions.scan(filter).all().exec();
  console.log(`Subscriptions loaded: ${JSON.stringify(subscriptions)}`);
  return subscriptions;
}

const saveEventList = async (events) => {
  const listEvents = [];
  events.forEach((event) => {
    const eventAttribute = new Event(event);
    listEvents.push(eventAttribute);
  });

  await Event.batchPut(listEvents);
  console.log(`Events saved: ${JSON.stringify(listEvents)}`);
}

const getEvents = async (minutesToTrack) => {
  const timestamp = (new Date((new Date().getTime()) - minutesToTrack * 60000)).toISOString();
  const events = await Event.scan().filter('timestamp').gt(timestamp).exec();
  console.log(`Events loaded: ${JSON.stringify(events)}`);
  return events;
}

const getTeams = async () => {
  const teams = await Team.scan().all().exec();
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
