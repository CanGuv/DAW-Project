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
};

router.get('/', function (req, res, next) {
    // Get userID from session
    let userId = req.session.userId
    // SQL query to get user data
    let sqlQuery = "SELECT  w.workout_type, w.duration_minutes, w.intensity, w.calories_burned, w.workout_date, we.exercise_name, we.sets, we.reps, we.weight_kg FROM Workouts w LEFT JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE  w.user_id = ? ORDER BY w.workout_date DESC";

    // Execute the query and handle the result
    db.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            return next(err)
        }
        // Pass the goals data to the EJS template
        res.render("logworkout", { workouts: results, user: userId });
    });
});

router.post('/log', redirectLogin, function (req, res, next)  {
    // Get userID from session
    let userId = req.session.userId

    // Sanitize body
    workout_type = req.sanitize(req.body.workout_type)
    duration_minutes = req.sanitize(req.body.duration_minutes)
    intensity = req.sanitize(req.body.intensity)
    calories_burned = req.sanitize(req.body.calories_burned)
    workoutday = req.sanitize(req.body.workoutday)
    workoutmonth = req.sanitize(req.body.workoutmonth)
    workoutyear = req.sanitize(req.body.workoutyear)
    exercise_name = req.sanitize(req.body.exercise_name)
    sets = req.sanitize(req.body.sets)
    reps = req.sanitize(req.body.reps)
    weight_kg = req.sanitize(req.body.weight_kg)

    // Validate the sanitized input and handle errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/workout'); }
    else { 
        // Formatting of Date
        let workout_date = workoutyear + "-" + workoutmonth + "-" + workoutday

        // SQL query to insert data
        let workoutInsertQuery = "INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES (?, ?, ?, ?, ?, ?)";

        // Execute the query and handle the result
        db.query(workoutInsertQuery, [userId, workout_type, duration_minutes, intensity, calories_burned, workout_date], (err, result) => {
            if (err) {
                return next(err)
            }

            let workoutId = result.insertId;

            let exerciseInsertQuery = "INSERT INTO Workout_Exercises (workout_id, exercise_name, sets, reps, weight_kg) VALUES (?, ?, ?, ?, ?)";

            db.query(exerciseInsertQuery, [workoutId, exercise_name, sets, reps, weight_kg], (err, result) => {
                if (err) {
                    return next(err)
                }

                res.redirect('/workout');
            });
        });
    };
});

router.get('/search',function(req, res, next){
    // Get userID from session
    let userId = req.session.userId
    res.render("search.ejs", {user: userId});
});

router.get('/search_result', redirectLogin, function (req, res, next) {
    // Get userID from session
    let userId = req.session.userId

    // Get the workout type from the query string
    let workoutType = req.sanitize(req.query.workoutType.toLowerCase())

    // SQL query to select data
    let sqlQuery = "SELECT w.workout_type, we.exercise_name FROM Workouts w JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE w.user_id = ? AND LOWER(w.workout_type) = ?";

    // Execute the query and handle the result
    db.query(sqlQuery, [userId, workoutType], (err, results) => {
        if (err) {
            return next(err)
        }
        res.render("list", { workoutexercises: results, user: userId, typesearched: workoutType });
    });
});

module.exports = router;