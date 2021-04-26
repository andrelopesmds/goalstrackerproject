const closeAction = 'close-action';

self.addEventListener('push', (event) => {
    const iconPath = 'ball.png';
    const badgePath = 'ball.png';

    if (event.data) {
        const notification = JSON.parse(event.data.text());
        const { title, body } = notification;

        const options = {
            badge: badgePath,
            body,
            icon: iconPath, // todo - get it from backend in order to customize the message
            actions: [
                {
                    action: closeAction,
                    title: 'Close',
                    icon: iconPath,
                },
            ],
        };

        const promiseChain = self.registration.showNotification(title, options);
        event.waitUntil(promiseChain);

    } else {
        console.log(`This push event has no data. Event: ${JSON.stringify(event)}.`);
    }
});

self.addEventListener('notificationclick', (event) => {
    const clickedNotification = event.notification;
    if (event.action === closeAction) {
        clickedNotification.close();
    }
});
