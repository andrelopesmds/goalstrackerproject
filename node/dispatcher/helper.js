const createEventObjectAndIdsList = (event) => {
  const imageOfEvent = event.Records[0].dynamodb.NewImage;
  const eventObj = {
    team1: imageOfEvent.team1.S,
    team2: imageOfEvent.team2.S,
    score: imageOfEvent.score.S,
  };

  const idsList = [];
  if (imageOfEvent.team1Id) {
    idsList.push(imageOfEvent.team1Id.S);
  }
  if (imageOfEvent.team2Id) {
    idsList.push(imageOfEvent.team2Id.S);
  }

  return [
    eventObj,
    idsList,
  ];
};

const filterAndCleanSubscriptions = (subscriptions, idsList) => {
  const filteredSubscriptions = [];
  subscriptions.forEach((subscription) => {
    let containId = false;
    const subscriptionIdsList = subscription.teamsIds.split(',');

    subscriptionIdsList.forEach((subscriptionId) => {
      idsList.forEach((id) => {
        if (subscriptionId == id) {
          containId = true;
        }
      });
    });

    if (containId) {
      delete subscription.teamsIds;
      filteredSubscriptions.push(subscription);
    }
  });

  return filteredSubscriptions;
};

module.exports = {
  createEventObjectAndIdsList,
  filterAndCleanSubscriptions,
};
