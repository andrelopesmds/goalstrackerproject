function subscribe() {

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {

        if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {

            if (window.confirm('Seu navagador não suporta o envio de notificações, mas você pode utilizar o SIGA O GALO no Google Chorme.')) {
                window.location.href='https://www.google.com/chrome/browser/index.html';
            };

        } else {
            alert("Seu navegador não suporta o envio de notificações!");
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
                    // console.log('Service worker installing');
                } else if (reg.waiting) {
                    serviceWorker = reg.waiting;
                    // console.log('Service worker installed & waiting');
                } else if (reg.active) {
                    serviceWorker = reg.active;
                    // console.log('Service worker active');
                }

                if (serviceWorker) {
                    console.log("sw current state", serviceWorker.state);
                    if (serviceWorker.state == "activated") {
                        //console.log("sw already activated - Do watever needed here");
                    }
                    serviceWorker.addEventListener("statechange", function(e) {
                        console.log("sw statechange : ", e.target.state);
                        if (e.target.state == "activated") {
                            // use pushManger for subscribing here.
                            subscribeUserToPush(reg);
                            console.log('Service worker registered and activated.');
                        }
                    });
                }
            },
            function(err) {
                console.error('unsuccessful registration with ', workerFileName, err);
            }
        );

}


function subscribeUserToPush(registration) {
    const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
            'BB_UaOpdFIEjEWMyhhd4QQcFDwlaftDy605YjzatvFlCoYMvjpFUFHNy_KoGpRcoOBxUzDN2_8svehppzOolYP4'
        )
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
        }).then(function(response) {
            if (response.ok) {

                document.getElementById("p1").style.display = "none";
                document.getElementById("p2").style.display = "";
                document.getElementById("p3").style.display = "";


            } else {
                alert('Algo errado aconteceu. Seu cadastro não foi efetuado. Entre em contato para suporte');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
