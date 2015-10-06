( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-utilities' );

  app.directive( 'errorMessage', [
    '$errorMessage', '$sce',
    function ( $errorMessage, $sce ) {

      return {
        scope: {
          phrasing: '=phrasing'
        },
        restrict: 'AE',
        templateUrl: 'directives/errorMessage/errorMessage.html',
        transclude: true,
        link: function ( $scope, $elem, $attrs ) {

          /////////////////////
          // Event Handlers //
          ///////////////////

          $scope.onCloseButtonClicked = function () {
            $scope.isCollapsed = true;
          };

          $scope.onShowErrorClicked = function () {
            $scope.showError = !$scope.showError;
            $scope.showErrorText = ( $scope.showError ) ? 'Hide details...' : 'Show details...';
            if ( $scope.showError ) {
              $scope.errorText = $sce.trustAsHtml( $scope.phrasing.error );
            }
          };

          /////////////////////
          // Initialization //
          ///////////////////

          ( function init () {

            // Build the custom error explanation and support invitation.
            $scope.explanation = $sce.trustAsHtml( $errorMessage.getExplanation( $scope.phrasing ) );
            $scope.supportInvitation = $sce.trustAsHtml( $errorMessage.getSupportInvitation( $scope.phrasing ) );

            // Get a version of the phrasing merged with the default copy.
            $scope.mergedPhrasing = $errorMessage.getPhrasingMerged( $scope.phrasing );

            // Toggle to show/hide server error details.
            $scope.showError = false;
            $scope.showErrorText = 'Show details...';
            $scope.errorText = '';

            // Use this variable to allow the error to be collapsed
            $scope.isCollapsed = false;

          } )();

        }

      };

  } ] );

} )();
