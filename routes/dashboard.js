const express = require("express")
const router = express.Router()

router.get('/', function (req, res) {
    let userId = req.session.userId;

    // First query to get the user's goals
    let goalsQuery = "SELECT * FROM Goals WHERE user_id = ?";
    db.query(goalsQuery, [userId], function(err, goalsResults) {
        if (err) {
            return next(err);
        }

        // Second query to get the user's workouts
        let workoutsQuery = "SELECT w.workout_type, w.duration_minutes, w.intensity, w.calories_burned, w.workout_date, we.exercise_name, we.sets, we.reps, we.weight_kg FROM Workouts w LEFT JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE w.user_id = ?";
        db.query(workoutsQuery, [userId], function(err, workoutsResults) {
            if (err) {
                return next(err);
            }

            // Render the dashboard with both goals and workouts data
            res.render('dashboard.ejs', {goals: goalsResults, workouts: workoutsResults});
        });
    });
});

module.exports = router;