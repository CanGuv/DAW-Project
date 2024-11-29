const express = require("express")
const router = express.Router()

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/auth/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

router.get('/', function (req, res, next) {
    let userId = req.session.userId
    let sqlQuery = "SELECT  w.workout_type, w.duration_minutes, w.intensity, w.calories_burned, w.workout_date, we.exercise_name, we.sets, we.reps, we.weight_kg FROM Workouts w LEFT JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE  w.user_id = ?"

    db.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            return next(err)
        }
        // Pass the goals data to the EJS template
        res.render("logworkout", { workouts: results, user: userId })
    });
});

router.post('/log', redirectLogin, function (req, res, next)  {
    let userId = req.session.userId

    let { workout_type, duration_minutes, intensity, calories_burned, workoutday, workoutmonth, workoutyear, exercisename, sets, reps, weight_kg } = req.body;
    
    let workout_date = workoutyear + "-" + workoutmonth + "-" + workoutday

    let workoutInsertQuery = "INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES (?, ?, ?, ?, ?, ?)"

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
});

router.get('/search',function(req, res, next){
    let userId = req.session.userId
    res.render("search.ejs", {user: userId})
})

router.get('/search_result', redirectLogin, function (req, res, next) {
    let userId = req.session.userId
    let workoutType = req.query.workoutType.toLowerCase()
    let sqlQuery = "SELECT w.workout_type, we.exercise_name FROM Workouts w JOIN Workout_Exercises we ON w.workout_id = we.workout_id WHERE w.user_id = ? AND LOWER(w.workout_type) = ?"

    db.query(sqlQuery, [userId, workoutType], (err, results) => {
        if (err) {
            return next(err)
        }
        // Pass the goals data to the EJS template
        res.render("list", { workoutexercises: results, user: userId })
    });
})

module.exports = router;