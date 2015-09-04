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

      $scope.validate = function (form) {
            for (var error_type in form.$error) {
                for (var error in form.$error[error_type]) {
                    if (form.$error[error_type][error].$pristine && form.$error[error_type][error].$setViewValue !== undefined) {
                        form.$error[error_type][error].$setViewValue(form.$error[error_type][error].$modelValue);
                    }
                }
            }

            return form.$valid; //TODO Работает только в ECMAScript >= 5 Переписать на underscore
        }
        ;

      $scope.cancel = function() {
        $scope.$dismiss();
      };

      $scope.save = function(form) {
        if ($scope.validate(form)) {
          if ($scope.model._id) {
            $http.put('/api/part/' + $scope.model._id, $scope.model).then(savingDone());
          } else {
            $http.post('/api/part', $scope.model).then(savingDone());
          }
        }
      };
    }]
  );
