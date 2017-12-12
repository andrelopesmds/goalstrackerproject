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

const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/cCCHPILFEyQ:APA91bFNgWcNtY39e2K4zPgI5s_bo_cx9JGR8fPugPOfc2OOVtk1nVBId59awV1ci5aEe-08dIScX8aYkyurZsnIq_lwP7EtSOirnUYA8G6ToYtWB1curuDukMjPsn0zxGEgEELGp3Nh","expirationTime":null,"keys":{"p256dh":"BFBlgPF7Ev32EGbvZB_6HM7jpJ8XCNe4Eo8zpYtkMyl4Wy6dgi6qQFHyVxLuGY69WvpU6y5UhwWn1yCAXtesFms=","auth":"cnNN_Gsokhd3Oc8ldTUzbw=="}}


/*const subscription = {
	"endpoint": "https://fcm.googleapis.com/fcm/send/fqeV2xx7CpA:APA91bHaqPL_-6oxK2RAS_rAeBiUpmzzee8iN_64HIebSRoWtRD2_OZKuEc0MplT6OjkTWmwarJQJbvWi5Bp0tbM_yTJMceaM9uRWoUJNA_V3s5poKqYinL492avsABPskXYgMfX2tiI",
	"expirationTime": null,
	"keys":{ 
		"p256dh":"BPfNPIOhOi5qzr97S1M3JPXOkv41ekFv14IqY978JuQUPTLzmjPWj7tw2r4qJpMb19szUESO4BIMsqeb3HuuvYI=",
		"auth": "TuI67m9tX3J-_ROve6_E2g==" }
}*/

triggerPushMsg(subscription, 'I am working, bitch!');


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
