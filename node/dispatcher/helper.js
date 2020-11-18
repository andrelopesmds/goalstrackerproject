const createEventObject = (imageOfEvent) => {
  const team1 = imageOfEvent.team1.S;
  const team2 = imageOfEvent.team2.S;
  const score = imageOfEvent.score.S;

  return {
    title: 'Goal',
    body: `${team1} ${score} ${team2}`,
  };
};

const createIdsList = (imageOfEvent) => {
  const idsList = [];
  if (imageOfEvent.team1Id) {
    idsList.push(imageOfEvent.team1Id.S);
  }
  if (imageOfEvent.team2Id) {
    idsList.push(imageOfEvent.team2Id.S);
  }

  return idsList;
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
      const temp = { ...subscription };
      delete temp.teamsIds;
      filteredSubscriptions.push(subscription);
    }
  });

  return filteredSubscriptions;
};

module.exports = {
  createEventObject,
  createIdsList,
  filterAndCleanSubscriptions,
};
