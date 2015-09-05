'use strict';

angular.module('meanCatalogApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ng-mfb'
])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/limit/10/page/1/query/');
      $stateProvider
        .state('home', {
          url: '/limit/:limit/page/:page/query/:query',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        })
        .state('parts_edit', {
          url: 'parts/:id',
          parent: 'home',
          onEnter: ['$stateParams', '$state', '$modal',
            function($stateParams, $state, $modal) {
              $modal
                .open({
                  templateUrl: 'components/modal/modal.html',
                  resolve: {
                    id: function() {
                      return  $stateParams.id;
                    }
                  },
                  controller: 'PartModalCtrl'
                })
                .result.then(function() {
                  $state.transitionTo('home', $state.params, {notify:true, reload:true});
                }, function() {
                  $state.transitionTo('home', $state.params);
                });

            }
          ]

        });
    }
  ]);
