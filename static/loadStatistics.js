getStatistics();

function show(points) {

console.log(points);

var dataPoints = [];
for(i = 0; i < points.length; i++){
  dataPoints.push({
    'x': new Date('"'+points[i][0]+'-'+points[i][1]+'"'), 'y': points[i][2]
  });
}

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Number of active users"
	},
	axisY:{
		includeZero: true
	},
	data: [{        
		type: "line",       
		dataPoints: dataPoints
	}]
});
chart.render();

}



function getStatistics(){

return fetch('/statistics/', {
  method: 'GET',
  headers: {'Content-Type': 'application/json'}
  }).then(function(response){ return response.json();})
    .then(function(obj) { return makePoints(obj.data);})
    .then(function(points){

      console.log(points);                   
      show(points);

    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}

function makePoints(data){

  var counter = [];
  var month, year;
  var skip;

  //teste  adding fake data
  data.push({'subscribeDate':"2017-12-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2017-12-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-01-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-01-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-01-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-01-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-01-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-01-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-01-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2017-11-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2017-11-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-02-26T17:15:10.48Z", 'unsubscribeDate':null});
  data.push({'subscribeDate':"2018-02-26T17:15:10.48Z", 'unsubscribeDate':null});
  // teste

  for (i = 0; i < data.length; i++){

    if(!data[i].unsubscribeDate){

      subscribeDate = new Date(data[i].subscribeDate);
      month = subscribeDate.getMonth() + 1;
      year = subscribeDate.getFullYear();           

      skip = false;
      for(j = 0; j < counter.length; j ++){
        if( year == counter[j][0] && month == counter[j][1]){
          counter[j][2] = counter[j][2] + 1;
          skip = true;
        }
      }
      if(!skip){
        counter.push([year, month, 1]);
      }
    } 
  }

  // sort items by date
  counter.sort(function (a,b){
    return (a[0]*12+a[1]) - (b[0]*12+b[1]);
  });
return counter;
}


