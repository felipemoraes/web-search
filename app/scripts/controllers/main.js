'use strict';

/**
 * @ngdoc function
 * @name webSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webSearchApp
 */
angular.module('webSearchApp')
  .controller('MainCtrl', function ($scope,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  	$scope.currentPage = 1;
  	$scope.pageSize = 10;
  	$scope.result = [];
  	$scope.ready = false;

	$scope.show_about = false;
  	$scope.about = function(){
  		if ($scope.show_about) {
  			$scope.show_about = false;
  		} else {
  			$scope.show_about = true;
  		}
  	}

	$scope.show_advanced = false;
  	$scope.advanced = function(){
  		if ($scope.show_advanced) {
  			$scope.show_advanced = false;
  		} else {
  			$scope.show_advanced = true;
  		}
  	}
    $scope.search = function(query) {
    	if (!query.hasOwnProperty("type_search")){
    		query.type_search = "linear";

    	}
    	var ws=new WebSocket("ws://localhost:8080/search");
		//var ws=new WebSocket("ws://54.207.104.21:80/search");
		ws.onopen = function () {
			 ws.send(JSON.stringify(query));
		}

		ws.onmessage=function(evt){
			
			$scope.result = JSON.parse((evt.data));
		
			for (var i = 0; i < $scope.result.hits.length; i++) {
				try {
				 	$scope.result.hits[i].title = utf8.decode($scope.result.hits[i].title);
				}catch(err) {
					console.log("Error parsing title " + $scope.result.hits[i].title );
				}
			};
			$scope.ready = true;
			$scope.$apply();
			ws.close();
		};
		ws.onclose = function(){
		}
	}
	$scope.pageChangeHandler = function(num) {
      console.log('search page changed to ' + num);
  	};


	 
  });
