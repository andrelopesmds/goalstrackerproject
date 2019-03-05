self.addEventListener('push', function(event) {
    if (event.data) {

        var json = JSON.parse(event.data.text());
        var title = json.title;
        var badge = 'images/hifk.png';


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