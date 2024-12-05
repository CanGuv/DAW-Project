// Import the Express framework
const express = require("express")
// Create a new router instance
const router = express.Router()

// Import the express-validator
const { check, validationResult } = require('express-validator')

// Middleware function to redirect users to login
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/auth/login');
    } else { 
        next ();
    } 
}

router.get('/', function (req, res, next) {
    // Get userID from session
    let userId = req.session.userId
    // SQL query to get user data
    let sqlQuery = "SELECT * FROM Goals WHERE user_id = ?";

    // Execute the query and handle the result
    db.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            next(err)
        }

        res.render("goals.ejs", { goals: results, user: userId });
    });
});

router.post('/addgoal', redirectLogin, function (req, res) {
    // Get userID from session
    let userId = req.session.userId

    // SQL query to get user data
    let sqlquery = "INSERT INTO goals (user_id, goal_type, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)";

    // Get the data from the request body
    let data = [userId, req.sanitize(req.body.goaltype), req.sanitize(req.body.startyear) + "-" + req.sanitize(req.body.startmonth) + "-" + req.sanitize(req.body.startday), 
        req.sanitize(req.body.endyear) + "-" + req.sanitize(req.body.endmonth) + "-" + req.sanitize(req.body.endday), req.sanitize(req.body.status)
    ]

    // Execute the query and handle the result
    db.query(sqlquery, data, (err, result) => {
        if (err) {
            next(err)
        }
        else {
            res.send('Added, congrats!!')
        }
    });
});

module.exports = router;