const AWS        = require('aws-sdk');
const controlDB  = require('./controldb.js');
const response   = require('./response.js');
const msgSender  = require('./msgSender.js');

exports.handler = async (event) => {
    try {
        if(!validateRequest(event)) return response.badRequest;

        var result = await push(event);
    }
    catch (err) {
        console.log(err);
        return response.internalError;
    }

    return result;
};

async function push(event) {
    const docClient  = new AWS.DynamoDB.DocumentClient();

    const subscriptions = await controlDB.getSubscriptions(docClient);
    
    const result = await msgSender(subscriptions, event);
    
    await controlDB.removeInvalidSubscriptions(docClient, result);

    return response.ok;
}


function validateRequest(obj) {
    if (obj && obj.title && obj.body && obj.icon) return true;
}
