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

/*const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/cCCHPILFEyQ:APA91bFNgWcNtY39e2K4zPgI5s_bo_cx9JGR8fPugPOfc2OOVtk1nVBId59awV1ci5aEe-08dIScX8aYkyurZsnIq_lwP7EtSOirnUYA8G6ToYtWB1curuDukMjPsn0zxGEgEELGp3Nh","expirationTime":null,"keys":{"p256dh":"BFBlgPF7Ev32EGbvZB_6HM7jpJ8XCNe4Eo8zpYtkMyl4Wy6dgi6qQFHyVxLuGY69WvpU6y5UhwWn1yCAXtesFms=","auth":"cnNN_Gsokhd3Oc8ldTUzbw=="}}
*/

const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/e8dqhU-RXyU:APA91bGBDaUgJmHUP0v53_XIYtmPpMiRAnWLlXhH3PTa_ojUVuDnIoujJiX4L6yRpm1RVC_aIgGxQcZ7o4PtAQZcG3QS2cGIlAU_Oj3XIcfoSapIUFza-qv3KFWNq6BjsuKsk2pwXLPd","expirationTime":null,"keys":{"p256dh":"BPcz_TmIeGU4yX6p0my_vBMgjdfGchV8pGJAzc-9lcyL-kHtmtTs3G3NTRWvZiMoZkDayDMFCFVqwqr45ieaoH8=","auth":"Pfq9SGYc1-q1T5-9UG29WA=="}}

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
