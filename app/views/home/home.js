'use strict';

angular.module('cafe')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('/home', {
          templateUrl: 'home/home.html',
          controller: 'homeCtrl',
          params:{
              name:"home"
          }
        });
}])

.controller('homeCtrl', [function() {

}]);