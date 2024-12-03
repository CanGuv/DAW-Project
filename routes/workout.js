// Import the Express framework
const express = require("express")
// Create a new router instance
const router = express.Router()

// Import the express-validator
const { check, validationResult } = require('express-validator')

// Middleware function to redirect users to login
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/auth/login')
    } else { 
        next ();
    } 
}

router.get('/', function (req, res, next) {
    // Get userID from session
    let userId = req.session.userId
    // SQL query to get user data
    let sqlQuery = "SELECT  w.workout_type, w.duration_minutes, w.intensity, w.calories_burned, w.workout_date, we.exercise_name, we.sets, we.reps, we.weight_kg FROM Workouts w LEFT JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE  w.user_id = ?"

    // Execute the query and handle the result
    db.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            return next(err)
        }
        // Pass the goals data to the EJS template
        res.render("logworkout", { workouts: results, user: userId })
    });
});

router.post('/log', redirectLogin, function (req, res, next)  {
    // Get userID from session
    let userId = req.session.userId

    // Sabitize body
    req.body = req.sanitize(req.body)

    // Validate the sanitized input and handle errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/log'); }
    else { 

        // Get the data from the request body
        let { workout_type, duration_minutes, intensity, calories_burned, workoutday, workoutmonth, workoutyear, exercisename, sets, reps, weight_kg } = req.body;
        
        // Formatting of Date
        let workout_date = workoutyear + "-" + workoutmonth + "-" + workoutday

        // SQL query to insert data
        let workoutInsertQuery = "INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES (?, ?, ?, ?, ?, ?)"

        // Execute the query and handle the result
        db.query(workoutInsertQuery, [userId, workout_type, duration_minutes, intensity, calories_burned, workout_date], (err, result) => {
            if (err) {
                return next(err)
            }

            let workoutId = result.insertId;

            let exerciseInsertQuery = "INSERT INTO WorkoutExercises (workout_id, exercise_name, sets, reps, weight_kg) VALUES (?, ?, ?, ?)"

            db.query(exerciseInsertQuery, [workoutId, exercisename, sets, reps, weight_kg], (err, result) => {
                if (err) {
                    return next(err)
                }

                res.redirect('/workout');
            });
        });
    }
});

router.get('/search',function(req, res, next){
    // Get userID from session
    let userId = req.session.userId
    res.render("search.ejs", {user: userId})
})

router.get('/search_result', redirectLogin, function (req, res, next) {
    // Get userID from session
    let userId = req.session.userId

    // Get the workout type from the query string
    let workoutType = req.query.workoutType.toLowerCase()

    // SQL query to select data
    let sqlQuery = "SELECT w.workout_type, we.exercise_name FROM Workouts w JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE w.user_id = ? AND LOWER(w.workout_type) = ?"

    // Execute the query and handle the result
    db.query(sqlQuery, [userId, workoutType], (err, results) => {
        if (err) {
            return next(err)
        }
        res.render("list", { workoutexercises: results, user: userId, typesearched: workoutType })
    });
})

module.exports = router;