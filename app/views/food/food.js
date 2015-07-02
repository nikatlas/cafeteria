/**
 * Created by n.atlas on 2/7/2015.
 */
'use strict';

angular.module('cafe')

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('orderfood', {
            url: "/orderfood",
            templateUrl: "tmpls/orderfood.html",
            controller: "foodCtrl"
        })
        .state('fainon', {
            url: "/fainon",
            templateUrl: "tmpls/fainon.html",
            controller: "foodCtrl"
        })
        .state('mainfood', {
            url: "/mainfood",
            templateUrl: "tmpls/mainfood.html",
            controller: "foodCtrl"
        });
}])
.controller("foodCtrl" , ['$scope' ,  '$rootScope' , '$localStorage', 'toastr',function($scope, $rootScope, $localStorage, toastr){
    $scope.foods = [];
    $scope.food = {
        comments: ""
    };

    var getImage = function(i){
        var lpic = graphUrl + $scope.data[i].object_id + "?access_token=" + $localStorage.fbtoken;
        $.get(lpic).then(function(result){
            $scope.$applyAsync(function(){
                $scope.data[i].lpic = result.images[0].source;
            });
        });
    }
    $scope.getFainonAll = function(){
        var fainonId = "662166840552032";
        var urlToHit = graphUrl + fainonId + "/feed?access_token=" + $localStorage.fbtoken;
        $.get(urlToHit).then(function(results){
            $scope.$apply(function(){
                var r = [];
                for(var i in results.data){
                    if( results.data[i].type == "photo" ){
                        r.push(results.data[i]);
                    }
                }
                $scope.data = r;
                var today = new Date().getDay();
                for(var i in $scope.data){
                    if( new Date($scope.data[i].created_time).getDay() == today ){
                        $scope.data[i].simerino = true;
                    }
                    getImage(i);
                }
            });
        });
    }

    $scope.insert = function () {
        var table = window.AzureClient.getTable("Food");
        if( $scope.food.comments.length < 2 )return;

        var obj = {
            text : $scope.food.comments,
            user : $rootScope.fbdata.name,
            userId : $rootScope.user.userId,
            complete : false
        };
        table.insert(obj).done(function(res){
            toastr.success("Inserted!");
        });
    }

    $scope.getAll = function(){
        var table = window.AzureClient.getTable("Food");
        table.where({complete : false}).orderByDescending("__updatedAt").read().done(function(res){
            $scope.$apply(function(){
                $scope.foods = res;
            });
        });
    }
    $scope.del = function(item){
        var table = window.AzureClient.getTable("Food");
        table.del(item).done(function(){
            $scope.getAll();
        });
    }


    $rootScope.orderComplete = function(){
        if( $rootScope.user ){
            if( allowedUsers.indexOf($rootScope.user.userId) > -1 ){
                window.AzureClient.invokeApi("Helpers/foodOrderConfirm/" + $rootScope.fbdata.name , {body:null , method: "post"}).done(function(){
                    $scope.getAll();
                });
            }
            else{
                toastr.info("You are not allowed to perform this action.");
            }
        }
    }

}]);