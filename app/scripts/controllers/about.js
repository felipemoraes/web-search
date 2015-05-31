'use strict';

/**
 * @ngdoc function
 * @name webSearchApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSearchApp
 */
angular.module('webSearchApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
