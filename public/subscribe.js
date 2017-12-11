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

	registerServiceWorker();

	// continue ...

    }else{
	alert("Check if any field is empty");
    }


}

}





function registerServiceWorker() {
  return navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    return registration;
  })
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
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




