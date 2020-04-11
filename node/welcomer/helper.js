const createSubscriptionsObject = (event) => {
  try {
    const imageOfEvent = event.Records[0].dynamodb.NewImage;
    const eventObj = {
      endpoint: imageOfEvent.endpoint.S,
      keys: {
        auth: imageOfEvent.keys.M.auth.S,
        p256dh: imageOfEvent.keys.M.p256dh.S,
      },
    };

    return eventObj;
  } catch (error) {
    throw new Error(`Error processing dynamodb event: ${JSON.stringify(error)}.`);
  }
};

const createWelcomeMessageObject = () => {
  const WelcomeObj = {
    team1: 'You are now',
    score: 'following your',
    team2: 'favorite team(s)!',
    currentStatus: 'Welcome to Goalstracker!',
  };
  return WelcomeObj;
};

module.exports = {
  createSubscriptionsObject,
  createWelcomeMessageObject,
};
