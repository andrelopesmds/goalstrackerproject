function subscribe(){

if ( !('serviceWorker' in navigator) || !('PushManager' in window) ){
    alert("Sorry, your browser does not support this application!");
    document.getElementById("buttonId").disabled = true;
}
else{

    // validate form data
    var name = document.getElementById("nameId").value;
    var email = document.getElementById("emailId").value;
    var team = document.getElementById("teamId").value;    
    if(validate(name, email, team)){

	subscribeUserToPush();

	// continue ...

    }else{
	alert("Check if any field is empty");
    }


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

	// send it to backend too!!!
    var name = document.getElementById("nameId").value;
    var email = document.getElementById("emailId").value;
    var team = document.getElementById("teamId").value;    
	
    var data = JSON.parse(subscription);

    data.name = name;
    data.email = email;
    data.team = team;

    console.log(data);
    var subscription = JSON.stringify(data);     
    console.log(subscription);

  return fetch('/api/save-subscription/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: subscription
  });
}

function validate(name, email, team){
	// check if any field is not empty
	if(name && email && team){
	  console.log(name, email, team);
	  return true;
	}else{
	return false
	}
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



