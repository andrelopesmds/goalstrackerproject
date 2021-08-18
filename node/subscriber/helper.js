const processSubscription = (event) => {
  const body = JSON.parse(event.body);
  const subscription = JSON.parse(body.subscription);
  const { teamsIds } = body;

  validateInput(subscription, teamsIds);

  subscription.teamsIds = teamsIds.toString();
  return subscription;
};

const validateInput = (subscription, teamsIds) => {
  if (!isSubscriptionValid(subscription)) {
    throw new Error('Subscription is not valid');
  }

  if (!teamsIds || !(teamsIds.length > 0)) {
    throw new Error('TeamsIds is not valid');
  }
};

const isSubscriptionValid = (subscription) => {
  if (!hasProperties(subscription, ['endpoint', 'keys']) || !hasProperties(subscription.keys, ['p256dh', 'auth'])) {
    return false;
  }

  if (!subscription.endpoint.includes('https')) {
    return false;
  }

  return true;
};

// eslint-disable-next-line max-len
const hasProperties = (obj, propertiesList) => propertiesList.every((property) => Object.prototype.hasOwnProperty.call(obj, property));

module.exports = {
  processSubscription,
};
