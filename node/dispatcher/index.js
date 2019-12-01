'use strict';

module.exports.handler = async (event) => {
    const obj = createEventObject(event);

    console.log('Event which will be sent')
    console.log(obj);
};

function createEventObject(event) {
    try {
        return {
            team1: event.Records[0].dynamodb.NewImage.team1.S,
            team2: event.Records[0].dynamodb.NewImage.team2.S,
            score: event.Records[0].dynamodb.NewImage.score.S,
            currentStatus: event.Records[0].dynamodb.NewImage.currentStatus.S
        }
    } catch (error) {
        console.log(`Error processing dynamodb event: ${JSON.stringify(error)}`);
        throw error;
    }
}