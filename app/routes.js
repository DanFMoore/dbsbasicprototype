var express = require('express')
var router = express.Router()

// store all form values in a session object
router.use(function (req, res, next) {
  if (req.session.formdata === undefined)
  {
    req.session.formdata = {};
  }
  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)){
      req.session.formdata[key] = req.body[key];
    }
  }
  console.log(req.session.formdata);
  next();
});

router.get('/', function (req, res) {
  res.render('index')
})

// Example routes - feel free to delete these

// Passing data into a page

router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name': 'Foo' })
})



// Section 1 - First form page
router.post('/formFirstPage', function(req, res) {
  res.render('formFirstPage', req.session)
})
// Section 1 - First form page
router.post('/formGender', function(req, res) {
  res.render('formGender', req.session)
})
// Section 1 - Place of birth
router.post('/formPlaceBirth', function(req, res) {
  res.render('formPlaceBirth', req.session)
})
// Section 2 - Sensitive Application
router.post('/formSensitive', function(req, res) {
  res.render('formSensitive', req.session)
})
// Section 3 - Add other names
router.post('/formAddNames', function(req, res) {
  res.render('formAddNames', req.session)
})
// Section 4 - Email Address
router.post('/formEmail', function(req, res) {
  res.render('formEmail', req.session)
})
// Section 5 - Verify address
router.post('/formAddress', function(req, res) {
  res.render('formAddress', req.session)
})
// Section 6 - Add other addresses
router.post('/formOtherAddresses', function(req, res) {
  res.render('formOtherAddresses', req.session)
})
// Section 7 - Send address
router.post('/formSendAddress', function(req, res) {
  res.render('formSendAddress', req.session)
})

//Address history overview
router.all('/formAddressHistory', function (req, res) {
 res.render('formAddressHistory', {
   'form_action' : '/formAddressGaps',
   'addressline1':req.session.addressline1,
   'addressline2':req.session.addressline2,
   'town':req.session.town,
   'postcode':req.session.postcode,
   'additionaladdress':req.session.additionaladdress
  });
 });

//Address results
router.all('/formPostcodeResults', function (req, res) {
 res.render('formPostcodeResults', { 'form_action' : '/radio-address-store' });
 });

//Store address results
 router.post('/radio-address-store', function (req, res){
   //Set additional address to true;
   req.session.additionaladdress=true;
   //Store additional address choice
   req.session.address = req.body['address-results-radio-group'];
   console.log(req.session.address);
   if (req.session.address=="Flat 7a"){
     req.session.addressline1 = "Flat 7a South Bank Tower";
     req.session.addressline2 = "Upper Ground";
     req.session.town = "London";
     req.session.postcode = "SE1 9EY"
   }
   else {
     req.session.addressline1 = "Flat 7b South Bank Tower";
     req.session.addressline2 = "Upper Ground";
     req.session.town = "London";
     req.session.postcode = "SE1 9EY"
   }
   res.redirect('formAddressDates');
 })

//formAddressGaps
router.post('/formAddressGaps', function(req, res) {
  res.render('formAddressGaps', req.session)
})

//Form address dates
router.post('/formAddressDates', function(req, res) {
  console.log(req.session.address);
  res.render('formAddressDates', req.session)
})
// Section 8 - Identity Details
router.post('/formIdentity', function(req, res) {
  res.render('formIdentity', req.session)
})
// Section 8 - Identity Details Driving Licence
router.post('/formIdentityDriving', function(req, res) {
  res.render('formIdentityDriving', req.session)
})
// Section 8 - Identity Details - Passport
router.post('/formIdentityPassport', function(req, res) {
  res.render('formIdentityPassport', req.session)
})
// Section 9 - Convictions
router.post('/formConvictions', function(req, res) {
  res.render('formConvictions', req.session)
})
// Summary - Summary page
router.post('/formSummary', function(req, res) {
  res.render('formSummary', req.session)
})
// Decalaration- Declaration page
router.post('/formDeclaration', function(req, res) {
  res.render('formDeclaration', req.session)
})
// Payment - Payment page
router.post('/formPayment', function(req, res) {
  res.render('formPayment', req.session)
})
// Complete - Application Complete
router.post('/formComplete', function(req, res) {
  res.render('formComplete', req.session)
})

// Branching

router.get('/examples/over-18', function (req, res) {
  // get the answer from the query string (eg. ?over18=false)
  var over18 = req.query.over18

  if (over18 === 'false') {
    // redirect to the relevant page
    res.redirect('/examples/under-18')
  } else {
    // if over18 is any other value (or is missing) render the page requested
    res.render('examples/over-18')
  }
})






// Training routes
// Routes for Tutorial 4


  // Ineligible users are routed to 'ineligible.html'



  router.get('/training/question-page-2', function (req, res) {

    var eligible = req.query.eligible;

    if (eligible == "Yes"){

      res.render('training/question-page-2');

    } else {

      res.redirect('ineligible');

    }

  });

  // Write the user input to the check your answers page

  router.get('/training/check-your-answers-page', function (req, res) {

    var feat = req.query.jugglingfeat;

    res.render('training/check-your-answers-page', { 'feat' : feat });

  });


  router.post('/training/test-post', function(req, res) {
    res.render('training/test-post', {})
  })
  router.post('/training/test-post-2', function (req, res) {
    var eligibile1 = req.query.eligible;
    res.render('training/test-post-2', { 'eligible' : eligibile1});
  });
  router.post('/training/check-your-answers-page-post', function (req, res) {
    var feat = req.query.jugglingfeat;
    res.render('training/check-your-answers-page', { 'feat' : feat });

  });







// add your routes here

module.exports = router
