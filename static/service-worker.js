self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('This push event has data: ', event.data.text());

    const promiseChain = self.registration.showNotification(event.data.text());
    event.waitUntil(promiseChain);

  } else {
    console.log('This push event has no data.');
  }
});

/*
self.addEventListener('push', function(event) {
  const promiseChain = self.registration.showNotification('Hello, World.');

  event.waitUntil(promiseChain);
});
*/

