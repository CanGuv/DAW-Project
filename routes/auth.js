// Import the Express framework
const express = require("express")
// Create a new router instance
const router = express.Router()

// Import the express-validator
const { check, validationResult } = require('express-validator')

// Import the bcrypt library
const bcrypt = require('bcrypt')
const { head } = require("request")
const saltRounds = 10 // Number of salt rounds for password hashing

router.get('/register', function (req, res) {
    res.render('register.ejs', { message: '', email: '', username: '', password: '', age: '', height: '', weight: ''} )                                                               
});

// Route handler to process user registration with validation rules
router.post('/registered', [check('email').isEmail().withMessage('Please enter a valid email address').notEmpty().withMessage('Email is required'), 
    check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters').notEmpty().withMessage('Username is required.'), 
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must have at least 1 capital letter')
    .matches(/\d/).withMessage('Password must have at least 1 number')
    .matches(/[@$!%*?&]/).withMessage('Password must have at least 1 symbol')
    .notEmpty().withMessage('Password is required'),
    check('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'), 
    check('age').isInt().withMessage('Enter a valid number').notEmpty().withMessage('Age is required'), 
    check('height').isFloat().withMessage('Enter a valid number').notEmpty().withMessage('Height is required'),  
    check('weight').isFloat().withMessage('Enter a valid number').notEmpty().withMessage('Weight is required'),
    check('gender').notEmpty().withMessage('Gender is required')], 
    function (req, res, next) {
        // Sanitize user input
        email = req.sanitize(req.body.email)
        username = req.sanitize(req.body.username)
        password = req.sanitize(req.body.password)
        gender = req.sanitize(req.body.gender)
        age = req.sanitize(req.body.age)
        height = req.sanitize(req.body.height)
        weight = req.sanitize(req.body.weight)
        
        // Validate the sanitized input and handle errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extract error messages
            const errorMessages = errors.array().map(err => err.msg);
        
            // Render the register page with the errors
            return res.render('register.ejs', { message: errorMessages, email: email, username: username, password: password, age: age, height: height, weight: weight });
        }
        else { 
            const plainPassword = password

            // Check if username is already in the database
            const usernameCheck = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';

            db.query(usernameCheck, [username], (err, results) => {
                if (err) {
                    return next(err);
                }
    
                if (results[0].count > 0) {
                    // If username already exists, show error message
                    return res.render('register.ejs', { message: ['Username already exists. Please pick another one'], email: email, username: '', password: password, age: age, height: height, weight: weight});
                }

                // Hash the user's password
                bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
                    if (err) {
                        return next(err);
                    }

                    // SQL to insert data
                    let sqlquery = `INSERT INTO users (username, email, password_hash, age, gender, height_cm, weight_kg) VALUES (?, ?, ?, ?, ?, ?, ?)`;

                    // Get the data from the request body
                    let data = [username, email, hashedPassword, age, gender, height, weight];

                    // Execute the query and handle the result
                    db.query(sqlquery, data, (err, results) => {
                        if (err) {
                            return next(err);
                        }

                        res.redirect('/auth/login')
                    });
                });
            });
        };
    });

router.get('/login', function (req, res){
    res.render('login.ejs', { message: '', username: ''} )
});

router.post('/loggedin', function (req, res, next){
    // Get the data from the request body
    const username = req.sanitize(req.body.username)
    const password = req.sanitize(req.body.password)

    // SQL query to get user data
    let sqlquery = "SELECT password_hash, user_id FROM Users WHERE username = ?"; 

    // Execute the query and handle the result
    db.query(sqlquery, [username], (err, results) => {

        if (err) {
            return next(err);
        }

        // Check if the username exists in the database
        if (results.length === 0) {
            return res.render('login.ejs', { message: ['Username is incorrect'], username: '' });
        }

        // Retrieve the hashed password
        const hashedPassword = results[0].password_hash

        // Compare the provided password with the hashed password
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if (err) {
                return res.status(500).send('Error during password comparison');
            }
            else if (result === true) {
                // Store the user's ID in the session
                req.session.userId = results[0].user_id
                res.redirect('/dashboard')
            }
            else {
                // If the passwords do not match, show error message
                return res.render('login.ejs', { message: ['Password is incorrect'], username: username });
            }
        });
    });
});

router.get('/logout', function (req, res) {
    // Destroy the user's session
    req.session.destroy(err => {
        if (err) {
          return res.send("error in destroying session")
        }
        res.redirect("/")
    });
});

module.exports = router