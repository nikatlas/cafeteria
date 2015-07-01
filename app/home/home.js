'use strict';

angular.module('me')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'homeCtrl',
      params:{
          name:"home"
      }
  });
}])

.controller('homeCtrl', [function() {

}]);