// Import the Express framework
const express = require("express")
// Create a new router instance
const router = express.Router()

router.get("/api", function(req, res, next){
    // SQL query to get data from the database
    let sqlquery = "SELECT DISTINCT LOWER(exercise_name) AS exercise_name FROM Workout_Exercises;"

    // Execute the query and handle the result
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