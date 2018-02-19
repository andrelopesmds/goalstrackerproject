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

const subscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/fO2ny_yVTOs:APA91bG7cAHUJs065IXAA6ibGLPo7sGTYFzzctlHVM093rQtPWBpKHpvMlIJCKbP436N-i5BSw7bbFUYQJjW2ylBZPCAawwgjexdLxbsiwN7oBxlMIx55q1-nEpsGySIZKbWznSdOF74","expirationTime":null,"keys":{"p256dh":"BAShEE-6cXc3b-bYq_VD0Qw9DkCYn5vT8zSveToHh7obFQORj8JJYEsOP4hki_JX-nZ0V8mftFQCVSXoDUioIXM=","auth":"_djATzijEJB4C_1qXiAqJw=="}} // andre's mobile

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


