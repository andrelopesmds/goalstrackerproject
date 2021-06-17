const event = {
  Records: [
    {
      Sns: {
        Message: '{"obj":{"title":"Goal","body":"Palmeiras 2 - 1 Corinthians"},"subscription":{"endpoint":"https://fcm.googleapis.com/fcm/send/ezgCeL0uNWE:APA91bFiTLNAagFgvOfPhVxIX4P_103zAKAB72Fcd2s_oScQFaOkfE4RXPn--C_UjqOh7FFtny5kNfHuBjFj7KQHSY7oMhyHGb9mnXNZiQG84YCGntzSMZF4866DLsTGhNobJK_JvkNf","subscribeDate":"2021-05-30T14:42:27.123Z","keys":{"auth":"RNx6hY0fYpx0smuGaryoUw","p256dh":"BNrTplrofPpw8EUdulgLW8U5k9OuZ2KtRI-BiFXm5YmYgmHimcV4EabLdfQN-sbOZdo6cWG1RqGwihtyp6KRamE"},"teamsIds":"13,1,2,105,101,111"}}',
      },
    },
  ],
};

module.exports = event;
