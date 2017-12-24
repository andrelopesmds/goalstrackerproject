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

//const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/ddavWK_Omuk:APA91bHznLEEj-rCiXaHzaXd_I8tJHxKaqDCHL-N30qHVGRXPqMXQFmeZWk5b8cfJ8AOLWS_LXU90Km8YbQ7BTpnMdrrkN2oD5Y_hGAFzRAQ8BKMH0bG7I2AjtlA1IbynrAZaVOpKNkg","expirationTime":null,"keys":{"p256dh":"BO4t9GJLzlFpHh9t0z67KoAUDdr6NJ3Y5t2Tg42gs9uhn58VfELh7LOwgGASwjweE73sluA6NuPy5ldK3Nj48t0=","auth":"HyZBn5xEfWdHIJ7gzHvvAA=="}}


const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/cLQkYRexM9s:APA91bEoJTbjiv5Bf3461ZpPxmrX8Bqwes-_Q4bWzMLvhiU3XvczbAFwSHqZcQC-JXJaa-d0HAAHuOEpszquZlxQmNOlflEGAStrCrwAj8SQho8ENgCUwafP1nNBSyXMSb1wbZsUN-5f","expirationTime":null,"keys":{"p256dh":"BFYpiVZN7QgpsEJC4RYn3Y-StGxszIyrQciWjgzOWmN9UmYyA92E5xqp8KrRS52LwdcNtrDe6kuZTEiesL4y0r4=","auth":"TvllQnIWIyvScRTXUVqlkg=="}} // andre's mobile

exports.send = function(info){
triggerPushMsg(subscription, info);
}

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


