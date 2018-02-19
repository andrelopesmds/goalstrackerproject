const webpush = require('web-push');
var express = require('express')
var app = express()
var appPath = __dirname;
const path = require('path');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false}));

// routes
app.post('/', function(req, res){
  var team = req.body.team;
  var message = req.body.message;
  res.send(team+' :  '+message+'!');
  triggerPushMsg(subscription, message);
})

app.listen(3000, 'localhost')


const vapidKeys = {
  publicKey:
	process.env.PUBLIC_KEY,
  privateKey:
	process.env.PRIVATE_KEY
};

webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/cLQkYRexM9s:APA91bEoJTbjiv5Bf3461ZpPxmrX8Bqwes-_Q4bWzMLvhiU3XvczbAFwSHqZcQC-JXJaa-d0HAAHuOEpszquZlxQmNOlflEGAStrCrwAj8SQho8ENgCUwafP1nNBSyXMSb1wbZsUN-5f","expirationTime":null,"keys":{"p256dh":"BFYpiVZN7QgpsEJC4RYn3Y-StGxszIyrQciWjgzOWmN9UmYyA92E5xqp8KrRS52LwdcNtrDe6kuZTEiesL4y0r4=","auth":"TvllQnIWIyvScRTXUVqlkg=="}} // andre's mobile

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


