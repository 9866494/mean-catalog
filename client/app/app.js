'use strict';

angular.module('meanCatalogApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
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
        .state('parts_add', {
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
                // change route after modal result
                .result.then(function() {
                  // change route after clicking OK button
                  $state.transitionTo('home');
                }, function() {
                  // change route after clicking Cancel button or clicking background
                  $state.transitionTo('home');
                });

            }
          ]

        });
    }
  ]);
