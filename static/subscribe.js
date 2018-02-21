function subscribe(){

  if ( !('serviceWorker' in navigator) || !('PushManager' in window) ){
    alert("Sorry, your browser does not support this application!");
    document.getElementById("buttonId").disabled = true;
  }
  else{

    subscribeUserToPush();

  } 
}


function subscribeUserToPush() {
  return navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
	'BB_UaOpdFIEjEWMyhhd4QQcFDwlaftDy605YjzatvFlCoYMvjpFUFHNy_KoGpRcoOBxUzDN2_8svehppzOolYP4'
      )
    };
    return registration.pushManager.subscribe(subscribeOptions);
  })
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
  if(response.ok) {
    alert('Obrigado por se inscrever. Aqui é Galo!');
  } else {
    console.log('Algo errado aconteceu. Verifique sua conexão com a internet e/ou entre em contato para suporte');
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

