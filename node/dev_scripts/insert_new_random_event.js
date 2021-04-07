// Insert a new event in Events table - used to simulate a real time event that it is saved by fetch function

// Parameters
const tableName = "dev-EventsTable";

const team1 = 'Real Madrid';
const team1Id = '105'
const team2 = 'Liverpool';
const score = '1 - 0';
const timestamp = new Date().toISOString();

// Script
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

const event = {
  "team1": team1,
  "timestamp": timestamp,
  "team1Id": team1Id,
  "score": score,
  "team2": team2,
}

const params = {
  TableName: tableName,
  Item: event,
};

docClient.put(params, (err, data) => {
  if (err) console.log(err);

  else console.log('Event inserted!');
});