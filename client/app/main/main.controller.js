'use strict';

angular.module('meanCatalogApp')
  .controller('MainCtrl', ['$scope', '$http', '$stateParams', '$state' , function($scope, $http, $stateParams, $state) {
    $scope.isCollapsed = true;
    $scope.list = [];
    $scope.query = $stateParams.query;
    $scope.page = $stateParams.page;
    $scope.limit = $stateParams.limit;
    $scope.count = 0;
    $scope.selected = null;

    function loadList(){
      $state.go('.', $scope, {notify:false, reload:false});
      $http.get('/api/part/limit/' + $scope.limit + '/page/' + $scope.page + '/' + $scope.query).success(function(parts) {
        $scope.list = parts.list;
        $scope.count = parts.count;
        $scope.selected = null;
      });
    }

    $scope.$watch('[query,limit, page]', function() {
      loadList();
    });

    $scope.select = function edit(item) {
      _.map($scope.list,function(i){
        i.selected = false;
      });

      item.selected = true;
      $scope.selected = item._id
    };

    $scope.edit = function(id) {
      $state.go('parts_edit', {id:id});
    };

    $scope.edit_selected = function () {
        $state.go('parts_edit', { id: $scope.selected });
    };

    $scope.remove_selected = function () {
        
    };
  }]);
