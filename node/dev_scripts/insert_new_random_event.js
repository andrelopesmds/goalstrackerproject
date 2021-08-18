// Insert a new event in Events table - used to simulate a real time event that it is saved by fetch function
const logger = require('npmlog');

// Parameters
const tableName = 'dev-EventsTable';

const team1 = 'Flamengo';
const team1Id = '1';
const team2 = 'Corinthians';
const score = '1 - 0';
const timestamp = new Date().toISOString();

// Script
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const event = {
  team1,
  timestamp,
  team1Id,
  score,
  team2,
};

const params = {
  TableName: tableName,
  Item: event,
};

docClient.put(params, (err) => {
  if (err) logger.info(err);

  else logger.info('Event inserted!');
});
