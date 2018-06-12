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
router.all('/formAddNames', function (req, res) {
  //Sets address info to display by default
  req.session.addressentry1 = true;
  req.session.addressentry2 = true;
 res.render('formAddNames', req.session);
 });
// Section 4 - Email Address
router.post('/formEmail', function(req, res) {
  res.render('formEmail', req.session)
})

router.post('/formContactNumber', function(req, res) {
  res.render('formContactNumber', req.session)
})
// Section 5 - Verify address
router.post('/formAddress', function(req, res) {
  res.render('formAddress', req.session)
})
router.post('/formAddressCurrent', function(req, res) {
  res.render('formAddressCurrent', req.session)
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
  'form_action' : '/formIdentity',
   'delete_action_1' : '/deleteAction1',
   'delete_action_2': '/deleteAction2',
   'delete_action_3' : '/deleteAction3',
   'delete_action_4' : '/deleteAction4',
   'addressline1':req.session.addressline1,
   'addressline2':req.session.addressline2,
   'town':req.session.town,
   'postcode':req.session.postcode,
   'frommonth' : req.session.frommonth,
   'fromyear' : req.session.fromyear,
   'tomonth' : req.session.tomonth,
   'toyear' : req.session.toyear,
   'unfrommonth' : req.session.unfrommonth,
   'unfromyear' : req.session.unfromyear,
   'untomonth' : req.session.untomonth,
   'untoyear' : req.session.untoyear,
   'homeless' : req.session.homeless,
   'travelling' : req.session.travelling,
   'additionaladdress':req.session.additionaladdress,
   'addressentry1':req.session.addressentry1,
   'addressentry2':req.session.addressentry2,
   'unusualaddress':req.session.unusualaddress,
   'homelesstown' : req.session.homelesstown,
   'homelesscountry' : req.session.homelesscountry,
   'travelcountry' : req.session.travelcountry
 });
 });

 //formAddressAddNew
router.post('/formAddressAddNew', function(req, res) {
  res.render('formAddressAddNew', req.session)
});

//formAddressAddUnusual
router.post('/formAddressAddUnusual', function(req, res) {
  res.render('formAddressAddUnusual', req.session)
});



//formAddressUnusualDates
router.all('/formAddressUnusualDates', function(req, res) {
  if (req.body['unusual-address-group'] == "I was homeless"){
    req.session.question = "When were you homeless in " + req.body['homeless-town'] + "?";
    req.session.homeless = true;
    req.session.travelling = false;
  }
  else if (req.body['unusual-address-group'] == "I was travelling"){
    req.session.question = "When were you travelling in " + req.body['travel-country'] + "?";
    req.session.travelling = true;
    req.session.homeless = false;
  }
  req.session.homelesstown = req.body['homeless-town'];
  req.session.homelesscountry = req.body['homeless-country'];
  req.session.travelcountry = req.body['travel-country'];
  res.render('formAddressUnusualDates', { 
    'form_action' : '/unusual-dates-store',
    'question' : req.session.question
 })
});

//Store unusual address dates
 router.post('/unusual-dates-store', function (req, res){
   req.session.unusualaddress = true;
   console.log(req.session.unusualaddress);
   req.session.unfromyear = req.body['unusual-address-since-year'];
   if (req.body['unusual-current-address'] == 'unusual-current-address'){
     req.session.untoyear = "Present";
   }
   else {
     req.session.untoyear = req.body['unusual-address-until-year'];
   }
res.redirect('/formAddressHistory');
 });





 //Delete Address entry 1
 router.all('/deleteAction1', function (req,res){
   req.session.addressentry1 = false;
   res.redirect('/formAddressHistory');
 });

 //Delete Address entry 2
 router.all('/deleteAction2', function (req,res){
   req.session.addressentry2 = false;
   res.redirect('/formAddressHistory');
 });

 //Delete Address entry 3
 router.all('/deleteAction3', function (req,res){
   req.session.additionaladdress = false;
   res.redirect('/formAddressHistory');
 });

 //Delete Unusual Address entry 4
 router.all('/deleteAction4', function (req,res){
   req.session.unusualaddress = false;
   res.redirect('/formAddressHistory');
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
      console.log(req.session.addressline1);

   res.redirect('formAddressDates');
 });


 //Address results
 router.all('/formAddressManual', function (req, res) {
    res.render('formAddressManual', { 'form_action' : '/address-manual-store' });
  });

  router.all('/formAddressCurrentManual', function (req, res) {
    res.render('formAddressCurrentManual');
  });

  //Stores manual address Details
  router.post('/address-manual-store', function (req, res){
      req.session.additionaladdress = true;
      req.session.addressline1 = req.body['new-address-line-1'];
      req.session.addressline2 = req.body['new-address-line-2'];
      req.session.town = req.body['new-address-town-city'];
      req.session.county = req.body['new-address-county'];
      req.session.country = req.body['new-address-country'];
      req.session.postcode = req.body['new-address-postcode'];
      console.log(req.session.addressline1);
      console.log(req.session.addressline2);
      console.log(req.session.town);
      console.log(req.session.county);
      console.log(req.session.country);
      console.log(req.session.postcode);
  res.redirect('formAddressDates');
  });


//formAddressGaps
router.post('/formAddressGaps', function(req, res) {
  res.render('formAddressGaps', req.session)
})

//Form address dates
router.all('/formAddressDates', function (req, res) {
 res.render('formAddressDates', { 'form_action' : '/address-dates-store' });
 });

 //Store address dates
 router.post('/address-dates-store', function (req, res){
   req.session.fromyear = req.body['correct-address-since-year'];
   if (req.body['current-address'] == 'current-address'){
     req.session.toyear = "Present";
   }
   else {
     req.session.toyear = req.body['correct-address-until-year'];
   }
res.redirect('/formAddressHistory');
 });


// Section 8 - Identity Details
router.post('/formIdentity', function (req, res) {
  res.render('formIdentity', req.session)
})
// Section 8 - Identity Details Driving Licence
router.post('/formIdentityDriving', function(req, res) {
  res.render('formIdentityDriving', req.session)
})
// Section 8 - Identity Details Birth Certificate
router.post('/formIdentityBirthCert', function(req, res) {
  res.render('formIdentityBirthCert', req.session)
})
// Section 8 - Identity Details - Passport
router.post('/formIdentityPassport', function(req, res) {
  res.render('formIdentityPassport', req.session)
})
// Section 8 - Identity Details - Bank statement
router.post('/formIdentityBankStatement', function(req, res) {
  res.render('formIdentityBankStatement', req.session)
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
  res.redirect('formDeclarationExc')
})
// Payment - Payment page
router.post('/formPayment', function(req, res) {
  res.render('formPayment', req.session)
})
router.post('/paymentScreens', function(req, res) {
  res.render('paymentScreens', req.session)
})




// EXCEPTION ROUTE routes
router.get('/exceptionRouteDocs1', function (req, res) {
  req.session.documentsGroup = [];

  req.session.page = 1
  req.session.checkAgain = req.query.checkAgain
  res.render('exceptionRouteDocs', req.session)
})

router.get('/exceptionRouteDocs2', function (req, res) {
  req.session.page = 2
  res.render('exceptionRouteDocs', req.session)
})

router.get('/exceptionRouteDocs3', function (req, res) {
  req.session.page = 3
  res.render('exceptionRouteDocs', req.session)
})

router.post('/exceptionRouteCheckDocs', function (req, res) {
  var documents = [];

  if (req.body['documents-group']) {
    documents = req.body['documents-group'].constructor === Array
      ? req.body['documents-group']
      : [req.body['documents-group']]
  }

  req.session.documentsGroup = req.session.documentsGroup.concat(documents);

  const page = Number(req.body.page);
  const nextPage = '/exceptionRouteDocs' + (page + 1);
  req.session.licenceSelected = false;

  if (req.session.documentsGroup.length < 3) {
    // not enough docs
    res.redirect(page === 3 ? '/exceptionDocsErrorNotEnough' : nextPage)
  } else if (req.session.documentsGroup.indexOf('driving') !== -1) {
    // there are enough docs and one of them is the driving licence - happy path
    req.session.licenceSelected = true;

    res.redirect('/exceptionChosenDocs');
  } else if (req.session.documentsGroup.indexOf('both') !== -1) {
    // there are enough docs and one of them has both attributes - happy path
    res.redirect('/exceptionChosenDocs');
  } else if (req.session.documentsGroup.indexOf('addr') === -1) {
    // no address docs
    res.redirect(page === 3 ? '/exceptionDocsErrorNoAddress' : nextPage)
  } else if (req.session.documentsGroup.indexOf('dob') === -1) {
    // no dob docs
    res.redirect(page === 3 ? '/exceptionDocsErrorNoDob' : nextPage)
  } else {
    // there are enough docs, at least one has address and at least one has dob - happy path
    res.redirect('/exceptionChosenDocs')
  }
})
router.post('/exceptionRouteDocDetails1', function(req, res) {
  res.render('exceptionRouteDocDetails1', req.session)
})
router.get('/exceptionChosenDocs', function(req, res) {
  res.render('exceptionChosenDocs', req.session)
})
router.post('/formEnterName', function(req, res) {
  res.render('formEnterName', req.session)
})
router.post('/formEnterDob', function(req, res) {
  res.render('formEnterDob', req.session)
})

router.post('/exceptionDocsPrint', function(req, res) {
  res.render('exceptionDocsPrint', {
    'documents' : req.session.formdata['documents-group']
  })
})
// Complete - Application Complete
router.post('/formComplete', function(req, res) {
  var exception = req.session.formdata['exception'];
  if (typeof exception == 'undefined') {
    res.render('formComplete', req.session)
  } else {
    res.redirect('formCompleteExp');
  }
})

router.post('/formCompleteExp', function(req, res) {
  res.render('formCompleteExp', req.session);
})

// Branching



  // Ineligible users are routed to 'ineligible.html'



  router.get('/training/question-page-2', function (req, res) {

    var eligible = req.query.eligible;

    if (eligible == "Yes"){

      res.render('training/question-page-2');

    } else {

      res.redirect('ineligible');

    }

  });



// add your routes here

module.exports = router
