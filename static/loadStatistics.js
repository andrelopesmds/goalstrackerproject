getStatistics();

function getStatistics(){
return fetch('/statistics/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(function(response){ return response.json();})
          .then(function(data) {
            if (data.number) {

               var element = document.getElementById("number");
               element.innerHTML = data.number;               
          
            } else {
                console.log('Server did not return expetcted data');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
}
