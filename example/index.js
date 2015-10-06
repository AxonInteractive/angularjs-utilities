/* global alert:false */

( function () {

  'use strict';

  // Define the module and its dependencies.
  var app = angular.module( 'axon-utilities-test', [
    'axon-angularjs-utilities'
  ] );

  // Add some routes.
  app.config( [
    '$stateProvider', '$urlRouterProvider', 
    function ( $stateProvider, $urlRouterProvider ) {

      $urlRouterProvider.otherwise( '/' );

      $stateProvider.state( {
        name: 'root',
        url: '/',
        templateUrl: 'test.html',
        controller: [ 
          '$scope', '$sce', '$navigationListener', '$modal', 
          function ( $scope, $sce, $navigationListener, $modal ) {

            $navigationListener.startListening( $scope );

            $scope.testVal = 'Test message to see if the basics are working!';

            $scope.compileText = $sce.trustAsHtml( 'Compiled text!' );

            $scope.onModalOpenClick = function () {

              $modal.open( {
                templateUrl: 'views/GenericModal/GenericModal.html',
                controller: 'GenericModalController',
                resolve: {
                  '$modalArgs': function () {
                    return {
                      showCancelButton: true,
                      title: 'GenericModal Test',
                      message: '<p>Well, <strong>I\'d</strong> say it worked. How about you?</p>',
                      onCancelButtonClicked: function ( modalInstance ) { 
                        alert( 'Cancel clicked!' );
                        modalInstance.close(); 
                      },
                      onOkayButtonClicked: function ( modalInstance ) { 
                        alert( 'Okay clicked!' );
                        modalInstance.close(); 
                      }
                    };
                  }
                }
              } );

            };

          } 
        ]
      } );

  } ] );



} )();