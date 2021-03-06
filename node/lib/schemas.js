const dynamoose = require('dynamoose');

const { SUBSCRIPTIONS_TABLE } = process.env;
const { EVENTS_TABLE } = process.env;
const { TEAMS_TABLE } = process.env;

const { Schema } = dynamoose;

const subscriptionsSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
    hashKey: true,
  },
  expirationTime: {
    type: String,
    required: false,
  },
  keys: {
    type: Object,
    schema: {
      p256dh: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        required: true,
      },
    },
  },
  subscribeDate: {
    type: String,
    required: true,
  },
  unsubscribeDate: {
    type: String,
    required: false,
  },
  teamsIds: {
    type: String,
    required: true,
  },
});

const eventsSchema = new Schema({
  team1: {
    type: String,
    required: true,
    hashKey: true,
  },
  team1Id: {
    type: String,
  },
  score: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  team2Id: {
    type: String,
  },
  timestamp: {
    type: String,
    required: true,
  },
  currentStatus: {
    type: String,
  },
});

const teamsSchema = new Schema({
  id: {
    type: String,
    required: true,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  adapterInputName: {
    type: String,
  },
  adapterOutputName: {
    type: String,
  },
});

const Subscription = dynamoose.model(SUBSCRIPTIONS_TABLE, subscriptionsSchema);
const Event = dynamoose.model(EVENTS_TABLE, eventsSchema);
const Team = dynamoose.model(TEAMS_TABLE, teamsSchema);

module.exports = {
  Subscription,
  Event,
  Team,
};
