const url = 'https://vgdmfvp2pk.execute-api.us-east-1.amazonaws.com/prod';

function subscribe() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        if (/Safari/.test(navigator.userAgent) && /Apple Computer/.teste(navigator.vendor)) {
            if (window.confirm('Your browser does not support push notifications, but it is possible to use this app using Google Chorme.')) {
                window.location.href = 'https://itunes.apple.com/br/app/google-chrome/id535886823?mt=8';
            }
        } else {
            alert("Your browser does not support push notifications!");
        }

        document.getElementById("buttonId").disabled = true;
    } else {
        registerServiceWorker();
    }
}

function registerServiceWorker() {
    navigator.serviceWorker.register('service-worker.js')
        .then(function(reg) {
            var serviceWorker;

            if (reg.installing) {
                serviceWorker = reg.installing;
            } else if (reg.waiting) {
                serviceWorker = reg.waiting;
            } else if (reg.active) {
                serviceWorker = reg.active;
            }

            if (serviceWorker) {
                serviceWorker.addEventListener("statechange", function(e) {
                    if (e.target.state == "activated") {
                        subscribeUserToPush(reg);
                    }
                });
            }
        }, function(err) {
            console.error('unsuccessful registration with ', 'service-worker.js', err);
        });
}

function subscribeUserToPush(registration) {
    const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BB_UaOpdFIEjEWMyhhd4QQcFDwlaftDy605YjzatvFlCoYMvjpFUFHNy_KoGpRcoOBxUzDN2_8svehppzOolYP4')
    };

    return registration.pushManager.subscribe(subscribeOptions)
        .then(function(pushSubscription) {
            var data = JSON.stringify(pushSubscription);
            console.log('Received PushSubscription: ', data);
            sendToServer(data);

            return pushSubscription;
        });
}

function sendToServer(subscription) {
    console.log(subscription);

    return fetch('/api/save-subscription/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: subscription
        })
        .then(function(response) {
            if (response.ok) {
                detectUser();
            } else {
                alert('Something wrong happened. Please contact support.');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
