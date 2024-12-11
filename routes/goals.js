// Import the Express framework
const express = require("express")
// Create a new router instance
const router = express.Router()

// Middleware function to redirect users to login
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/usr/757/auth/login');
    } else { 
        next ();
    } 
}

router.get('/', function (req, res, next) {
    // Get userID from session
    let userId = req.session.userId
    // SQL query to get user data
    let sqlQuery = "SELECT * FROM Goals WHERE user_id = ? ORDER BY start_date DESC";

    // Execute the query and handle the result
    db.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            next(err)
        }

        res.render("goals.ejs", { goals: results, user: userId });
    });
});

router.post('/addgoal', redirectLogin, function (req, res, next) {
    // Get userID from session
    let userId = req.session.userId

    // SQL query to get user data
    let sqlquery = "INSERT INTO Goals (user_id, goal_type, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)";

    // Get the data from the request body
    let data = [userId, req.body.goaltype, req.body.startyear + "-" + req.body.startmonth + "-" + req.body.startday, 
        req.body.endyear + "-" + req.body.endmonth + "-" + req.body.endday, req.body.status
    ]

    // Execute the query and handle the result
    db.query(sqlquery, data, (err, result) => {
        if (err) {
            next(err)
        }
        else {
            res.redirect('/usr/757/goals')
        }
    });
});

module.exports = router;
