'use strict';

angular.module('meanCatalogApp')
  .controller('PartCtrl', function ($scope) {
    $scope.model = {

    };

    $scope.edit_mode = false;
    $scope.expand = false;

    $scope.toggleEdit = function() {
      $scope.edit_mode = !$scope.edit_mode;
    }

    $scope.toggleExpand = function() {
      $scope.expand = !$scope.expand;
    }
  });
