'use strict';

angular.module('meanCatalogApp')
  .controller('MainCtrl', function($scope, $http, $state) {
    $scope.isCollapsed = true;
    $scope.list = [];
    $scope.query = '';

    $scope.$watch('query', function() {
      $http.get('/api/part/' + $scope.query).success(function(parts) {
        $scope.list = parts;
      });
    });
  });
