const express = require("express")
const router = express.Router()

const { check, validationResult } = require('express-validator')

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/register', function (req, res) {
    res.render('register.ejs')                                                               
})

router.post('/registered', [check('email').isEmail(), check('username').isLength({ min: 8 }), check('password').isLength({ min: 8 }).matches(/[A-Z]/).matches(/\d/).matches(/[@$!%*?&]/), check('age').optional().isInt(),  check('height').optional().isFloat(),  check('weight').optional().isFloat()], function (req, res, next) {
    req.body.username = req.sanitize(req.body.username);
    req.body.email = req.sanitize(req.body.email);
    req.body.gender = req.sanitize(req.body.gender)
    req.body.age = req.sanitize(req.body.age)
    req.body.height = req.sanitize(req.body.height)
    req.body.weight = req.sanitize(req.body.weight)
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/register'); }
    else { 
        const plainPassword = req.body.password

        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
            if (err) {
                return next(err); // Handle hashing errors
            }
            // Store hashed password in your database.
            let sqlquery = `INSERT INTO users (username, email, password_hash, age, gender, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            let data = [req.body.username, req.body.email, hashedPassword, req.body.age, req.body.gender, req.body.height, req.body.weight];
            // Execute the query, passing in the user data
            db.query(sqlquery, data, (err, results) => {
                if (err) {
                    return next(err); // Handle database errors
                }

                res.send('You are all set up!')
            });
        })
    }
})

router.get('/login', function (req, res){
    res.render('login.ejs')
})

router.post('/loggedin', function (req, res, next){

})

router.get('/logout', function (req, res){

})

module.exports = router