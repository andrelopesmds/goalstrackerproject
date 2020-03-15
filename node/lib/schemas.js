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
    default: new Date().toISOString(),
  },
  unsubscribeDate: {
    type: String,
    default: null,
  },
});

const eventsSchema = new Schema({
  team1: {
    type: String,
    required: true,
    hashKey: true,
  },
  score: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  currentStatus: {
    type: String,
    required: true,
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
});

const SubscriptionsModel = dynamoose.model(SUBSCRIPTIONS_TABLE, subscriptionsSchema);
const EventsModel = dynamoose.model(EVENTS_TABLE, eventsSchema);
const TeamsModel = dynamoose.model(TEAMS_TABLE, teamsSchema);

module.exports = {
  SubscriptionsModel,
  EventsModel,
  TeamsModel,
};