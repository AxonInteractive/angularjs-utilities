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
