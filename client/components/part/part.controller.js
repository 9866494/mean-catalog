'use strict';

angular.module('meanCatalogApp')
  .controller('PartCtrl', function ($scope, $http) {

    function savingDone(res){
        $scope.edit_mode = false;
    }

    function deletingDone(res){
        $scope.edit_mode = false;
    }

    $scope.save = function() {
      if ($scope.model._id) {
        $http.put('/api/part/' + $scope.model._id, $scope.model).then(savingDone());
      } else {
        $http.post('/api/part', $scope.model).then(savingDone());
      }
    };

    $scope.delete = function() {
      if ($scope.model._id) {
        $http.delete('/api/part/' + $scope.model._id, $scope.model).then(deletingDone());
      } else {
        $http.delete('/api/part', $scope.model).then(deletingDone());
      }
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
