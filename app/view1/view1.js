'use strict';

angular.module('me')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl',
      params:{
          name : "view1"
      }
  });
}])

.controller('View1Ctrl', [function() {

}]);