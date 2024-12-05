// Import the Express framework
const express = require("express")
// Create a new router instance
const router = express.Router()

router.get('/',function(req, res){
    res.render('home.ejs', {user: req.session.userId});
})

router.get('/about',function(req, res){
    res.render('about.ejs', {user: req.session.userId});
})

module.exports = router