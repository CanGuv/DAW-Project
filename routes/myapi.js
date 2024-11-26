const express = require("express")
const router = express.Router()

router.get("/api", function(req, res, next){
    let sqlquery = "SELECT DISTINCT LOWER(exercise_name) AS exercise_name FROM Workout_Exercises;"

    // Execute the sql query
    db.query(sqlquery, (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})

module.exports = router