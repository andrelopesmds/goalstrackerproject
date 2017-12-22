const webpush = require('web-push');


const vapidKeys = {
  publicKey:
	'BB_UaOpdFIEjEWMyhhd4QQcFDwlaftDy605YjzatvFlCoYMvjpFUFHNy_KoGpRcoOBxUzDN2_8svehppzOolYP4',
  privateKey:
	'rvItNYAINR2IHFz9Kt06HSwcPtPEg7w81nHmNB9pYpc'
};

webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

//missÃo
//const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/ewPLwwNB_dY:APA91bGCSOk1Q0gZiKRmrLIMfAP4-nULspL00trRvR4qHaq7WJhzA2NgUBDyhtoN94kydUz9Ic8NNi0jElPGLo19N0Zyw4CqMWC5dgDnawGVKQ7sGsarNxxraGt6-SLIGJXUXfykxSBF","expirationTime":null,"keys":{"p256dh":"BFHccgEvxJYs7qX5Z_LpdfWFHP5mTdY3sOcHu_h1n268__NA8_PLbe-Liwp7I3oZTueO6I6E6bL-u772TcmaumU=","auth":"1S8kIywMfr_Lyba-zfKmiQ=="}}


//andre mobile
const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/cLQkYRexM9s:APA91bEoJTbjiv5Bf3461ZpPxmrX8Bqwes-_Q4bWzMLvhiU3XvczbAFwSHqZcQC-JXJaa-d0HAAHuOEpszquZlxQmNOlflEGAStrCrwAj8SQho8ENgCUwafP1nNBSyXMSb1wbZsUN-5f","expirationTime":null,"keys":{"p256dh":"BFYpiVZN7QgpsEJC4RYn3Y-StGxszIyrQciWjgzOWmN9UmYyA92E5xqp8KrRS52LwdcNtrDe6kuZTEiesL4y0r4=","auth":"TvllQnIWIyvScRTXUVqlkg=="}} // andre's mobile


//andre
//const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/ckhzdJjnu70:APA91bH54ZfLZRQkK33ZggCc5jYEfEiroZCVmcY6y-6Ww_fSMYRswwZFPfJn-vaBovxfJgxfleeh4IYVeurPV5V6c2268c7CLBKJhpYY3nkaANATow7G69Fo0NUGb1L6cs7EHABnUoCK","expirationTime":null,"keys":{"p256dh":"BJC1Fr1YgWaUxdu0q1eKbVxSc7rjGFTZSu8SwM2yvMxXEJU1pkDpNgpf7zOe9S5nEsg7Fhf7qMuhKDzNWl8Uf4g=","auth":"zgS2ncPrEruylPN8JMUpOQ=="}} // andre's browser

triggerPushMsg(subscription, 'I am working!');


function triggerPushMsg(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
  .catch((err) => {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      console.log('Subscription is no longer valid: ', err);
    }
  });
};


