( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-utilities' );

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
