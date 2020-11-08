const keys = ['team1', 'score', 'team2'];

const createPayload = (event) => {
  validateEvent(event);

  const message = {
    title: event.obj.currentStatus || 'Goal',
    body: `${event.obj.team1} ${event.obj.score} ${event.obj.team2}`,
  };

  const payload = JSON.stringify(message);

  return payload;
};

const validateEvent = (event) => {
  const obj = event.obj;
  keys.forEach((key) => {
    if (!obj[key]) {
      throw new Error(`Event object is missing value. Event: ${JSON.stringify(event)}`);
    }
  });
};

module.exports = {
  createPayload,
};
