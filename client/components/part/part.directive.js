'use strict';

angular.module('meanCatalogApp')
  .directive('part', function () {
    return {
      templateUrl: 'components/part/part.html',
      restrict: 'E',
      controller: 'PartCtrl'
    };
  });
