( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-utilities' );

  app.factory( '$navigationListener', [
    '$window', '$modal', '$state',
    function( $window, $modal, $state ) {

      // Create the base object to be augmented.
      var self = {};

      ///////////////////////
      /// Event Handlers ///
      /////////////////////

      // Handles the DOM beforeunload event by returning the current message back to the browser 
      // to be displayed in a plain alert() box. This is a fallback to handle cases outside the 
      // purview of UI Router such as page refreshes and external page links.
      function onBeforeUnload( event ) {
        event.returnValue = message;
        return message;
      }

      // 
      function onStateChange( event, newTargetState ) {

        // 
        if ( isNavigationApprovedByUser ) {
          return;
        }

        // Block the default behaviour associated with this event.
        event.preventDefault();

        // Store the state to which the user is attempting to navigate so we can continue on to 
        // that destination if they explicitly okay it by clicking the Okay button.
        targetState = newTargetState;

        // Open the modal to confront the user.
        $modal.open( {
          templateUrl: 'views/__Modals/GenericModal/GenericModal.html',
          controller: 'GenericModalController',
          resolve: {
            '$modalArgs': function () {
              return {
                showCancelButton: true,
                onOkayButtonClicked: onModalUnsavedOkayButtonClicked,
                onCancelButtonClicked: onModalUnsavedCancelButtonClicked,
                title: 'Are you sure?',
                message: '<p>' + message + '</p>',
              };
            }
          }
        } );
      }

      // Handles the Okay button of the state change modal, indicating that the user intends to 
      // navigate away from the page.
      function onModalUnsavedOkayButtonClicked( modalInstance ) {
        modalInstance.close();
        isNavigationApprovedByUser = true;
        self.stopListening();
        $state.go( targetState );
        //isNavigationApprovedByUser = false;
      }

      // Handles the Cancel button of the state change modal, indicating that the user does not 
      // intend to navigate away from the page.
      function onModalUnsavedCancelButtonClicked( modalInstance ) {
        modalInstance.close();
        isNavigationApprovedByUser = false;
      }

      /////////////////////////
      /// Helper Functions ///
      ///////////////////////
      
      // Returns whether we are currently listening for navigation events.
      function isListening () {
        return !!deregisterFunc;
      }

      // Call this to establish listeners for navigation events.
      self.startListening = function( $scope, errorMessage ) {

        // If we're already listening, return now as no action is needed.
        if ( isListening() ) {
          return;
        }

        // If errorMessage is a string, update the message. 
        if ( angular.isString( errorMessage ) ) {
          message = errorMessage;
        }

        // Register a listener for state change events and store the deregistration function that 
        // $scope.$on returns to us so we can clear the listener later.
        deregisterFunc = $scope.$on( '$stateChangeStart', onStateChange );

        // Add a DOM event listener to handle navigation cases outside of what UI Router monitors.
        return $window.addEventListener( 'beforeunload', onBeforeUnload );
      };

      // Call this to clear any existing listeners for navigation events.
      self.stopListening = function() {

        // Reset the message to the default.
        message = DEFAULT_MESSAGE;

        // If we're already NOT listening, return now as no further action is necessary.
        if ( !isListening() ) {
          return;
        }

        // Deregister the listener and clear the deregister function.
        deregisterFunc();
        deregisterFunc = angular.noop;

        // Remove the DOM event listener (fallback navigation handler).
        $window.removeEventListener( 'beforeunload', onBeforeUnload );
      };

      ///////////////////////
      /// Initialization ///
      /////////////////////
      
      // The default error message that will appear when a dangerous navigation event takes place 
      // if no specialized message is set.
      var DEFAULT_MESSAGE = 'You are attempting to navigate away from a page where you could potentially lose unsaved changes.';

      // This variable is used to flag when a user has explicitly approved a navigation event, 
      // because called stopListening() appears to be insufficient to block the onStateChange
      // modal from reappearing when the user approves a state change.
      var isNavigationApprovedByUser;

      // This varaible stores the function returned by $scope.$on to deregister the current state 
      // change event listener.
      var deregisterFunc;

      // The current error message that will be displayed when a dangerous navigation event takes 
      // place.
      var message;

      // This variable stores the state to which the user is currently trying to navigate to until 
      // they explicitly approve or deny the navigation attempt.
      var targetState;

      ( function init () {

        isNavigationApprovedByUser = false;
        message = DEFAULT_MESSAGE;

      } )();

      ////////////////
      /// Exports ///
      //////////////

      return self;

    }

  ] );

} )();
