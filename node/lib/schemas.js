const dynamoose = require('dynamoose');

const SUBSCRIPTIONS_TABLE = process.env.SUBSCRIPTIONS_TABLE;
const EVENTS_TABLE = process.env.EVENTS_TABLE;
const TEAMS_TABLE = process.env.TEAMS_TABLE;

const Schema = dynamoose.Schema;

const subscriptionsSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
    hashKey: true,
  },
  expirationTime: {
    type: String,
    default: null,
  },
  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    },
  },
  subscribeDate: {
    type: String,
    required: true,
  },
  unsubscribeDate: {
    type: String,
    default: null,
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
  },
  adapterInputName: {
    type: String,
  },
  adapterOutputName: {
    type: String,
  },
});

const SubscriptionsModel = dynamoose.model(SUBSCRIPTIONS_TABLE, subscriptionsSchema);
const EventsModel = dynamoose.model(EVENTS_TABLE, eventsSchema);
const TeamsModel = dynamoose.model(TEAMS_TABLE, teamsSchema);

module.exports = {
  SubscriptionsModel,
  EventsModel,
  TeamsModel,
};
