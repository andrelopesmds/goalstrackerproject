// This script logs the most recent events from Events table

// Parameters
const N_EVENTS_TO_LOG = 3;

const env = 'dev'; // (dev | staging | prod)

// Script
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: `${env}-EventsTable`,
};

const sortByTimestamp = (a, b) => new Date(a.timestamp) - new Date(b.timestamp);

docClient.scan(params, (err, data) => {
  if (err) console.log(err);

  let allItems = [];
  data.Items.forEach((item) => {
    allItems.push(item);
  });

  allItems = allItems.sort(sortByTimestamp).reverse();

  for (let i = 0; i < N_EVENTS_TO_LOG; i++) {
    console.log(allItems[i]);
  }
});
