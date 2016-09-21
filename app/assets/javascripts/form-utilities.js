
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



        //var linkElement = 'data-parsley-id' + ()
        errorList += '<li><a href="#' + $(this).parent().parent().attr('id') + '">' + $( this ).text() + '</a></li>';

      });

      // add errors to div on page
      $('#error-summary-list').html(errorList);
      $('#error-summary').show();
      $('#error-summary').removeClass('hidden');

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


