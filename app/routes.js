var express = require('express')
var router = express.Router()

// store all form values in a session object
router.use(function (req, res, next) {
  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)){
      req.session[key] = req.body[key];
    }
  }
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
  res.render('formFirstPage', {})
})
// Section 2 - Sensitive Application
router.post('/formSensitive', function(req, res) {
  res.render('formSensitive', {})
})
// Section 3 - Add other names
router.post('/formAddNames', function(req, res) {
  res.render('formAddNames', {})
})
// Section 4 - Email Address
router.post('/formEmail', function(req, res) {
  res.render('formEmail', {})
})
// Section 5 - Verify address
router.post('/formAddress', function(req, res) {
  res.render('formAddress', {})
})
// Section 6 - Add other addresses
router.post('/formOtherAddresses', function(req, res) {
  res.render('formOtherAddresses', {})
})
// Section 7 - Send address
router.post('/formSendAddress', function(req, res) {
  res.render('formSendAddress', {})
})
// Section 8 - Identity Details
router.post('/formIdentity', function(req, res) {
  res.render('formIdentity', {})
})
// Section 9 - Convictions
router.post('/formConvictions', function(req, res) {
  
  res.render('formConvictions', {})
})
// Summary - Summary page
router.post('/formSummary', function(req, res) {
  //console.log(req.session);
  res.render('formSummary', {})
})
// Decalaration- Declaration page
router.post('/formDeclaration', function(req, res) {
  res.render('formDeclaration', {})
})
// Payment - Payment page
router.post('/formPayment', function(req, res) {
  res.render('formPayment', {})
})
// Complete - Application Complete
router.post('/formComplete', function(req, res) {
  res.render('formComplete', {})
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
