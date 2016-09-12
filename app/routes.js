var express = require('express')
var router = express.Router()

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

// add your routes here

module.exports = router
