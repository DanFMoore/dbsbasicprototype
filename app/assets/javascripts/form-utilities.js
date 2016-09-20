
(function(global) {
  "use strict";

  var $ = global.jQuery;
  var GOVUK = global.GOVUK || {};

  GOVUK.formUtilities = {

    // make list of errors on the form after parsley.js has performed validation
    showErrorSummary: function() {
      var errorList = '';

      // select elements with errors
      var $errorElements = $( ".parsley-errors-list li" );

      // construct new html with error summaries
      $( $errorElements ).each(function( index ) {

        var bits = $(this).parent()[0].id.split('-');
        var linkId = bits[bits.length-1];
        var finalLinkId = $('*[data-parsley-id=' + linkId + ']').attr('id');

        if (finalLinkId === undefined)
        {
          finalLinkId = 'id-' + linkId + '-1';
        }

        //var linkElement = 'data-parsley-id' + ()
        errorList += '<li><a href="#' + finalLinkId + '">' + $( this ).text() + '</a></li>';

      });

      // add errors to div on page
      $('#error-summary-list').html(errorList);
      $('#error-summary').show();

      // expose to screenreader
      $('#error-summary').attr('aria-expanded', 'true');
      $('#error-summary').attr('aria-hidden', 'false');

      document.getElementById('error-summary').focus();
    },

    hideErrorSummary: function()
    {
      $('#form-error-message').hide();
      $('#error-summary').hide();

      // hide from screenreader
      $('#error-summary').attr('aria-expanded', 'false');
      $('#error-summary').attr('aria-hidden', 'true');
    }
    
  };

  global.GOVUK = GOVUK;
})(window);


