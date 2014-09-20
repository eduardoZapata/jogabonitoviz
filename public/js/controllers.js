var app = angular.module("jogaB",[]);

app.controller("clubDropDown",["$scope","$http",function($scope,$http){
      $scope.selected = "germany";
      $scope.year = "2000"
      var data = [];
      for (var i = 2000; i < 2014; i++) {
        var name = i +" - " + (i + 1);
        var value = ""+ i;
        data.push({"name":name,"value":value});
      }
      $scope.seasons = data;
      $scope.leagues = [
        {name:"Bundesliga",value:"germany"},
        {name:"Ligue 1",value:"france"},
        {name:"La Liga",value:"spain"},
        {name:"Premier League",value:"england"},
        {name:"Seria A",value:"italy"},
      ];
    }]);