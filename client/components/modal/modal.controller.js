'use strict';

angular.module('meanCatalogApp')
  .controller('PartModalCtrl', ['$scope', '$http', 'id',
    function($scope, $http, id) {
      $scope.model = {

      }

      if (id !== 'add') {
        $http.get('/api/part/' + id).then(function(res){
          $scope.model = res.data;
        });
      }

      function savingDone() {
        $scope.$close(true);
      }

      $scope.cancel = function() {
        $scope.$dismiss();
      };

      $scope.save = function(form) {
        if (form.$valid) {
          if ($scope.model._id) {
            $http.put('/api/part/' + $scope.model._id, $scope.model).then(savingDone());
          } else {
            $http.post('/api/part', $scope.model).then(savingDone());
          }
        }
      };
    }]
  );
