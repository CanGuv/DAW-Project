// Import the Express framework
const express = require("express")
// Create a new router instance
const router = express.Router()

router.get('/', function (req, res) {
    // Get userID from session
    let userId = req.session.userId;

    // SQL query to get the user data
    let goalsQuery = "SELECT * FROM Goals WHERE user_id = ?";

    // Execute the query and handle the result
    db.query(goalsQuery, [userId], function(err, goalsResults) {
        if (err) {
            return next(err);
        }

        // SQL query to get the user data
        let workoutsQuery = "SELECT w.workout_type, w.duration_minutes, w.intensity, w.calories_burned, w.workout_date, we.exercise_name, we.sets, we.reps, we.weight_kg FROM Workouts w LEFT JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE w.user_id = ?";
        
        // Execute the query and handle the result
        db.query(workoutsQuery, [userId], function(err, workoutsResults) {
            if (err) {
                return next(err);
            }

            res.render('dashboard.ejs', {goals: goalsResults, workouts: workoutsResults});
        });
    });
});

module.exports = router;