'use strict';

// Globalies
var allowedUsers = ["Facebook:868748039884631","Facebook:10207217092088622"];
var graphUrl = "https://graph.facebook.com/v2.3/";

// Declare app level module which depends on views, and components
(function(){

    var app = angular.module("cafe" , ['ui.router','ngStorage','toastr', 'ngAnimate']);



    app.config(function($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");
        // Now set up the states
        $stateProvider.state('home', {
            url: "home/home.html"
        });

    });

    app.run(function($rootScope, $localStorage,$state) {

        $rootScope.viewName = "home";
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.viewName = toState.name;
            if( !$rootScope.loggedIn && toState.name != "home" ){
                event.preventDefault();
                $state.go("home");
                $rootScope.viewName = "home";
            }
            fixPage();
        });
        if( $localStorage.user ){
            $rootScope.$apply(function(){
                $rootScope.loggedIn = true;
                window.AzureClient.currentUser = $localStorage.user;
                $rootScope.user = window.AzureClient.currentUser;
                $rootScope.fbdata = $localStorage.fbdata;
                $rootScope.fbtoken = $localStorage.fbtoken;
                $rootScope.fbpicsrc = $localStorage.fbpicsrc;
            });
        }
        // RootScope
        $rootScope.login = function () {
            window.AzureClient.login("facebook").then(function () {
                $rootScope.$apply(function(){
                    $rootScope.loggedIn = true;
                    $rootScope.user = window.AzureClient.currentUser;
                    $localStorage.user = window.AzureClient.currentUser;
                });
            }, function(error){
                alert(error);
            }).then(function () {
                return window.AzureClient.invokeApi("Helpers/facebook/token", {body :null , method : "get"});
            }).then(function (res) {
                $localStorage.fbtoken = res.result.accessToken;
                return res.result.accessToken;
            }).then(function(token){
                return $.get("https://graph.facebook.com/v2.3/me?access_token="+token);
            }).then(function (data) {
                $rootScope.$apply(function(){
                    $localStorage.fbdata = data;
                    $rootScope.fbdata = data;
                    $localStorage.fbpicsrc = "https://graph.facebook.com/v2.3/me/picture?type=large&access_token="+$localStorage.fbtoken;
                    $rootScope.fbpicsrc = "https://graph.facebook.com/v2.3/me/picture?type=large&access_token="+$localStorage.fbtoken;
                });
                return $localStorage.fbtoken;
            });
        };
        $rootScope.logout = function () {
            window.AzureClient.logout();
            delete $localStorage.user;
            $localStorage.$reset();
            delete $rootScope.fbdata;
            delete $rootScope.fbpicsrc;
            delete $rootScope.fbtoken;
            $rootScope.loggedIn = false;
        };
    });

    window.AzureClient = new WindowsAzure.MobileServiceClient(
        "https://siebencafe.azure-mobile.net/",
        "HDGpuYoXFhGxnODiWlLhyoWiYLOuYA65"
    );


})();