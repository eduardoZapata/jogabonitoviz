function request(url){
    var req = new XMLHttpRequest();
    req.open('GET',url,false);
    req.send(null);
    var res = JSON.parse(req.responseText);
    return res ;
}

function extractAndSort(cache) {
  var arr = [];

  for(var obj in cache){
        arr.push({'name':obj,'points':cache[obj]});
    }
    
    arr = arr.sort(function(a,b){
      if (a.points > b.points) {
        return 1;
      }

      if (a.points < b.points) {
        return -1
      }
      return 0;
    });

    return arr
}

function graph() {
  var country = document.getElementById('league-selector').value;
  var year = document.getElementById('season-selector').value;
  if (!country || !year) {
    alert('Please select a year and country');
  }
  var ele = document.getElementById('graph')
  ele.innerHTML = "";

  var points = request(route("points",country,year));
  drawBarGraph(extractAndSort(points),"Points Earned");
  
  var goals = request(route("goals",country,year));
  drawBarGraph(extractAndSort(goals),"Goals Scored");
  
  
  var conceded = request(route("conceded",country,year));
  drawBarGraph(extractAndSort(conceded),"Goals Conceded")
}

function route(metric,country,year){
  return "/"+metric+"/"+country+"@"+year;
}

function extractAndSort(cache) {
  var arr = [];
  for(var obj in cache){
        arr.push({'name':obj,'metric':cache[obj]});
    }    
  arr = arr.sort(function(a,b){
    if (a.metric > b.metric) {
      return 1;
    }

    if (a.metric < b.metric) {
      return -1
    }
    return 0;
  });
  return arr
}