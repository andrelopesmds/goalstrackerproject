const logger = require('npmlog');
const { Team, Subscription, Event } = require('./schemas.js');

const saveSubscription = async (subscription) => {
  const subscriptionEntity = { ...subscription };

  delete subscriptionEntity.expirationTime;
  delete subscriptionEntity.unsubscribeDate;

  const subscriptionAttribute = new Subscription(subscriptionEntity);

  await subscriptionAttribute.save();
  logger.info(`Subscription saved: ${JSON.stringify(subscriptionEntity)}`);
};

const deleteSubscription = async (subscription) => {
  const completeSubscription = await getSubscription(subscription.endpoint);
  completeSubscription.unsubscribeDate = new Date().toISOString();

  const subscriptionAttribute = new Subscription(completeSubscription);

  await subscriptionAttribute.save();
  logger.info(`Subscription deleted: ${JSON.stringify(subscription)}`);
};

const getSubscription = async (endpoint) => {
  const subscription = await Subscription.query('endpoint').eq(endpoint).exec();
  logger.info(`Subscription loaded: ${JSON.stringify(subscription)}`);
  return subscription[0];
};

const getSubscriptions = async () => {
  const unsubscribedUsersAttribute = 'unsubscribeDate';

  const subscriptions = await Subscription.scan().filter(unsubscribedUsersAttribute).not().exists()
    .exec();
  logger.info(`Subscriptions loaded: ${JSON.stringify(subscriptions)}`);

  return subscriptions;
};

const saveEventList = async (events) => {
  const listEvents = [];
  events.forEach((event) => {
    const eventAttribute = new Event(event);
    listEvents.push(eventAttribute);
  });

  await Event.batchPut(listEvents);
  logger.info(`Events saved: ${JSON.stringify(listEvents)}`);
};

const getEvents = async (minutesToTrack) => {
  const timestamp = (new Date((new Date().getTime()) - minutesToTrack * 60000)).toISOString();
  const events = await Event.scan().filter('timestamp').gt(timestamp).exec();
  logger.info(`Events loaded: ${JSON.stringify(events)}`);
  return events;
};

const getTeams = async (attributesToShow = null) => {
  const teams = await Team.scan().all().attributes(attributesToShow).exec();
  logger.info(`Teams loaded: ${JSON.stringify(teams)}`);
  return teams;
};

module.exports = {
  saveSubscription,
  deleteSubscription,
  getSubscriptions,
  saveEventList,
  getEvents,
  getTeams,
};
