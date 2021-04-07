const subscription = {
  endpoint: 'https://dummystring',
  expirationTime: 'test',
  keys: {
    p256dh: 'test',
    auth: 'test',
  },
};

const teamsIds = [1, 13];

const event = {
  body: JSON.stringify({
    subscription: JSON.stringify(subscription),
    teamsIds,
  })
};

module.exports = event;
