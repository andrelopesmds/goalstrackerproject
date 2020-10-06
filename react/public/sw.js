self.addEventListener('push', function(event) {
    const iconPath = 'ball.png';
    const badgePath = 'ball.png';

    if (event.data) {
        let notification = JSON.parse(event.data.text());

        let title = notification.title;

        const options = {
            "badge": badgePath,
            "body": notification.body,
            "icon": iconPath // get it from backend in order to customize the message
        };

        const promiseChain = self.registration.showNotification(title, options);
        event.waitUntil(promiseChain);

    } else {
        console.log('This push event has no data.');
    }
});