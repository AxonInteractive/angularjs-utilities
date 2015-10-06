( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-utilities' );

  app.controller( 'GenericModalController', [
    '$scope', '$state', '$modalInstance', '$modalArgs', '$sce',
    function ( $scope, $state, $modalInstance, $modalArgs, $sce ) {

      ///////////////////////
      /// Event Handlers ///
      /////////////////////

      // Handles the Okay button on the modal being clicked.
      $scope.onOkayButtonClicked = function () {

        // Check if the onOkayButtonClicked passed in as part of $modalArgs is set and is actually 
        // a function. If it is not, simply close the modal and return.
        if ( typeof $modalArgs.onOkayButtonClicked !== 'function' ) {
          $modalInstance.close();
          return;
        }

        // Call the proxy function to execute any arbitrary instructions the caller intended.
        $modalArgs.onOkayButtonClicked( $modalInstance );
      };

      // Handles the Cancel button on the modal bring clicked.
      $scope.onCancelButtonClicked = function() {

        // Check if the onCancelButtonClicked passed in as part of $modalArgs is set and is 
        // actually a function. If it is not, simply close the modal and return.
        if ( typeof $modalArgs.onCancelButtonClicked !== 'function' ) {
          $modalInstance.close();
          return;
        }

        // Call the proxy function to execute any arbitrary instructions the caller intended.
        $modalArgs.onCancelButtonClicked( $modalInstance );
      };

      ///////////////////////
      /// Initialization ///
      /////////////////////

      ( function init() {

        if ( typeof $modalArgs === 'undefined' ) {
          throw new Error( 'A generic modal requires $modalArgs to be set.' );
        }

        // Place the title and message onto the $scope so they can be templated.
        $scope.title = $modalArgs.title;
        $scope.message = $sce.trustAsHtml( $modalArgs.message );
        $scope.showCancelButton = $modalArgs.showCancelButton;

      } )();

  } ] );

} )();
