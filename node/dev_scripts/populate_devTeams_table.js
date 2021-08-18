// This script copies teams from prod and insert them into teams dev table
const logger = require('npmlog');

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const paramsProd = {
  TableName: 'prod-TeamsTable',
};

const paramsDev = {
  TableName: 'dev-TeamsTable',
};

const createItem = async (params) => {
  const promise = docClient.put(params).promise();
  return promise;
};

const exec = async () => {
  const allItems = await docClient.scan(paramsProd).promise();

  const promises = [];
  allItems.Items.forEach((item) => {
    paramsDev.Item = item;
    promises.push(createItem(paramsDev));
  });

  await Promise.all(promises);
  logger.info('Operation concluded!');
};

exec();
