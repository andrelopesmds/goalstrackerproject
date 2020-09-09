'use strict';

const assert = require('assert');
const helper = require('./../dispatcher/helper');

const event = {
  Records: [
    {
      dynamodb: {
        NewImage: {
          team1: {
            S: 'team1',
          },
          team2: {
            S: 'team2',
          },
          score: {
            S: 'score',
          },
          currentStatus: {
            S: 'currentStatus',
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

const eventObjAndIdsList = [
  {
    score: 'score',
    team1: 'team1',
    team2: 'team2',
  },
  [1, 2],
];

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

const idsList = [14];

describe('Dispatcher service', function() {
  it('should create event object and ids list', function() {
    const result = helper.createEventObjectAndIdsList(event);
    assert.deepEqual(result, eventObjAndIdsList);
  });

  it('should filter subscriptions containing the teams id', function() {
    const result = helper.filterAndCleanSubscriptions(subscriptions, idsList);
    assert.deepEqual(result, filteredSubscriptions);
  });
});

