var app = angular.module("jogaB",[]);

app.controller("clubDropDown",["$scope","$http",function($scope,$http){
      $scope.selected = "";
      $scope.years = [];
      $scope.leagues = [
        {name:"Bundesliga",value:"germany"},
        {name:"Ligue 1",value:"france"},
        {name:"La Liga",value:"spain"},
        {name:"Premier League",value:"england"},
        {name:"Seria A",value:"italy"},
      ];
      $http.get('/'+ $scope.selected + "@').success(function(data){
        $scope.news = data;
      });
    }]);