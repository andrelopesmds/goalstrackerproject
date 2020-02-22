'use strict';

const dynamodb = require('../lib/dynamodb');

module.exports.handler = async (event) => {
  const body = JSON.parse(event['body']);

  try {
    await dynamodb.saveSubscription(body);
  } catch (error) {
    console.log(`Error when subscribing new user: ${JSON.stringify(error)}`);
    throw error;
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({message: `User subscribed!`, body: body}),
  };
};
