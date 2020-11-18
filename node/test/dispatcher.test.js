const assert = require('assert');
const helper = require('../dispatcher/helper');

const event = {
  Records: [
    {
      dynamodb: {
        NewImage: {
          team1: {
            S: 'Santos',
          },
          team2: {
            S: 'Palmeiras',
          },
          score: {
            S: '2x0',
          },
          team1Id: {
            S: 1,
          },
          team2Id: {
            S: 2,
          },
        },
      },
    },
  ],
};

const eventObject = {
  title: 'Goal',
  body: 'Santos 2x0 Palmeiras',
};

const idsList1 = [1, 2];

const subscriptions = [
  {
    endpoint: 'QqfawgxLgsgm5NNq6MghmQpWcIMNCoST',
    subscribeDate: '2020-03-28T21:11:28.420Z',
    keys: {
      auth: 'jsZU01DY',
      p256dh: 'BEt-ssfCaZT5vL',
    },
    teamsIds: '99,13',
  },
  {
    endpoint: 'B8qr2XOCpTM0MrRWVwW6tHat8kyuYBWSC-',
    subscribeDate: '2020-03-22T21:09:19.029Z',
    keys: {
      auth: 'BEm4aU0',
      p256dh: 'BHOPTTM7dUS92COj',
    },
    teamsIds: '14,13,99',
  },
  {
    endpoint: 'pwUoL_2ArBmroDBWQKN',
    subscribeDate: '2020-03-22T21:05:36.469Z',
    keys: {
      auth: 'FXFU5',
      p256dh: 'BIYau_MiNxAEvHG24',
    },
    teamsIds: '99,13,14',
  },
];

const filteredSubscriptions = [
  subscriptions[1],
  subscriptions[2],
];

const idsList2 = [14];

describe('Dispatcher service', () => {
  it('should create event object and ids list', () => {
    const imageOfEvent = event.Records[0].dynamodb.NewImage;
    const result = helper.createEventObject(imageOfEvent);
    assert.deepEqual(result, eventObject);
  });

  it('should create event object and ids list', () => {
    const imageOfEvent = event.Records[0].dynamodb.NewImage;
    const result = helper.createIdsList(imageOfEvent);
    assert.deepEqual(result, idsList1);
  });

  it('should filter subscriptions containing the teams id', () => {
    const result = helper.filterAndCleanSubscriptions(subscriptions, idsList2);
    assert.deepEqual(result, filteredSubscriptions);
  });
});
