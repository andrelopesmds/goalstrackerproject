// Insert a new event in Events table - used to simulate a real time event that it is saved by fetch function

// Parameters
const tableName = 'dev-EventsTable';

const team1 = 'Real Madrid';
const team1Id = '105';
const team2 = 'Liverpool';
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

docClient.put(params, (err, _data) => {
  if (err) console.log(err);

  else console.log('Event inserted!');
});
