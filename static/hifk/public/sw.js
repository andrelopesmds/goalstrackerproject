self.addEventListener('push', function(event) {
    const iconPath = 'hifk.png';
    const badgePath = 'hifkBadge.png';

    if (event.data) {
        let notification = JSON.parse(event.data.text());

        let title = notification.title;

        const options = {
            "badge": badgePath,
            "body": notification.body,
            "icon": notification.icon = 'hifk' ? iconPath : null
        };

        const promiseChain = self.registration.showNotification(title, options);
        event.waitUntil(promiseChain);

    } else {
        console.log('This push event has no data.');
    }
});