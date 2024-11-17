const express = require("express")
const router = express.Router()

const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/register', function (req, res) {
    res.render('register.ejs')                                                               
})

router.post('/registered', function (req, res, next) {

})

router.get('/login', function (req, res){
    res.render('login.ejs')
})

router.post('/loggedin', function (req, res, next){

})

router.get('/logout', function (req, res){

})

module.exports = router