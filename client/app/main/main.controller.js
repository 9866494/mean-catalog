'use strict';

angular.module('meanCatalogApp')
  .controller('MainCtrl', ['$scope', '$http', '$stateParams', '$state' , function($scope, $http, $stateParams, $state) {
    $scope.isCollapsed = true;
    $scope.list = [];
    $scope.query = $stateParams.query;
    $scope.page = $stateParams.page;
    $scope.limit = $stateParams.limit;
    $scope.count = 0;

    function loadList(){
      $state.go('.', $scope, {notify:false, reload:false});
      $http.get('/api/part/limit/' + $scope.limit + '/page/' + $scope.page + '/' + $scope.query).success(function(parts) {
        $scope.list = parts.list;
        $scope.count = parts.count;
      });
    }

    $scope.$watch('query', function() {
      loadList();
    });

    $scope.pageChanged = function() {
      loadList();
    };
  }]);
