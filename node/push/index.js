'use strict';

const webpush = require('web-push');

const vapidKeys = {
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
};

module.exports.handler = async (event) => {
    console.log('This is working');
    console.log(JSON.stringify(event));
};