self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('This push event has data: ', event.data.text());


    var json = JSON.parse(event.data.text());
    var title = json.title;
    var badge = 'images/galoBadge.png';


    const options = {
        "icon": json.icon,
	"body": json.body,
        "badge": badge
    };

    const promiseChain = self.registration.showNotification(title, options);
    event.waitUntil(promiseChain);

  } else {
    console.log('This push event has no data.');
  }
});

