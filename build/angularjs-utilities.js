/*! angularjs-utilities - v0.0.1 - 2015-02-09 */


////////////////////////////////////////
/// Initialize the AngularJS module ///
//////////////////////////////////////

( function () {

  'use strict';

  angular.module( 'ca.axoninteractive.AngularJS.Utilities', [
    'ui.bootstrap',
    'ui.router'
  ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'ca.axoninteractive.AngularJS.Utilities' );

  app.directive( 'compile', function ( $compile ) {

    // directive factory creates a link function
    return function ( scope, element, attrs ) {
      
      scope.$watch( 
        function ( scope ) {
          // watch the 'compile' expression for changes
          return scope.$eval( attrs.compile );
        }, 
        function ( value ) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html( value );
          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile( element.contents() )( scope );
        } 
      );

    };

  } );

} )();

( function () {

  'use strict';

  var app = angular.module( 'ca.axoninteractive.AngularJS.Utilities' );

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

( function () {

  'use strict';

  var app = angular.module( 'ca.axoninteractive.AngularJS.Utilities' );

  app.filter( 'TruncateText', [
    function () {

      return function ( inputStr, isWordwise, maxNumChars, suffixStr ) {

        // If no input is provided, return an empty string silently.
        if ( !inputStr ) {
          return '';
        }

        // Ensure that maxNumChars is a valid base-10 integer value. If it is not, return the input 
        // string silently.
        maxNumChars = parseInt( maxNumChars, 10 );
        if ( !maxNumChars ) {
          return inputStr;
        }

        // If the input is shorter than the maximum number of characters, it is returned unaltered 
        // but if it is longer, truncate the input to the specificed maximum number of characters.
        if ( inputStr.length <= maxNumChars ) {
          return inputStr;
        }
        else {
          inputStr = inputStr.substr( 0, maxNumChars );
        }

        // If this is a word-wise truncation, we need to find the end of the word on which the input 
        // was truncated above and move the end to exclude the remainder of that word, so it is not 
        // cut off (as is the case in non-word-wise truncation).
        if ( isWordwise ) {
          var lastspace = inputStr.lastIndexOf( ' ' );
          if ( lastspace !== -1 ) {
            inputStr = inputStr.substr( 0, lastspace );
          }
        }

        // Apply the suffix and return the truncated string.
        return inputStr + ( suffixStr || ' …' );

      };

    } 
  ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'ca.axoninteractive.AngularJS.Utilities' );

  app.factory( '$errorMessage', [
    function () {

      /////////////////
      /// Phrasing ///
      ///////////////

      var defaultPhrasing = {
        email: 'theteam@axoninteractive.ca',
        error: '',
        noun: 'the requested action',
        title: 'Something went wrong...',
        verb: 'complete',
        verbPresent: 'completing',
        createExplanation: function ( phrasing ) {
          return 'We encountered a problem while ' + phrasing.verbPresent + ' ' + phrasing.noun + '. This may be because no internet connection is available, or because of an internal server error. Check that your internet connection is working properly and try again.';
        },
        createSupportInvitation: function ( phrasing ) {
          return 'If you are unable to ' + phrasing.verb + ' ' + phrasing.noun + ' after several tries, feel free to contact our website administrator at <a href="mailto:' + phrasing.email + '">' + phrasing.email + '</a> so we can resolve this issue for you.';
        }
      };

      /////////////////////////
      /// Helper Functions ///
      ///////////////////////

      var getExplanation = function ( userPhrasing ) {
        var mergedPhrasing = defaultPhrasing;
        if ( userPhrasing ) {
          angular.extend( mergedPhrasing, userPhrasing );
        }
        if ( defaultPhrasing.createExplanation ) {
          return defaultPhrasing.createExplanation( mergedPhrasing );
        }
      };

      var getPhrasingCopy = function () {
        return angular.copy( defaultPhrasing );
      };

      var getPhrasingMerged = function ( userPhrasing ) {
        return angular.extend( defaultPhrasing, userPhrasing );
      };

      var getSupportInvitation = function ( userPhrasing ) {
        var mergedPhrasing = defaultPhrasing;
        if ( userPhrasing ) {
          angular.extend( mergedPhrasing, userPhrasing );
        }
        if ( defaultPhrasing.createSupportInvitation ) {
          return defaultPhrasing.createSupportInvitation( mergedPhrasing );
        }
      };

      ////////////////
      /// Exports ///
      //////////////

      return {
        defaultPhrasing      : defaultPhrasing,
        getExplanation       : getExplanation,
        getPhrasingCopy      : getPhrasingCopy,
        getPhrasingMerged    : getPhrasingMerged,
        getSupportInvitation : getSupportInvitation
      };

    }
  ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'ca.axoninteractive.AngularJS.Utilities' );

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

( function () {

  'use strict';

  var app = angular.module( 'ca.axoninteractive.AngularJS.Utilities' );

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
