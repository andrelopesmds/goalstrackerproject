// This script logs the most recent events from dev Events table

const N_EVENTS_TO_LOG = 10;

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "dev-EventsTable",
};

docClient.scan(params, (err, data) => {
  if (err) console.log(err);

  var allItems = [];
  data.Items.forEach(item => {
    allItems.push(item);
  });

  allItems = allItems.sort((a, b) => {
    a.timestamp - b.timestamp;
  }).reverse();

  for (let i = 0; i < N_EVENTS_TO_LOG; i++) {
    console.log(allItems[i]);
  }
});