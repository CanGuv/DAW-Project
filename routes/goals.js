// const { render } = require("ejs");
const express = require("express")
const router = express.Router()

router.get('/', function (req, res, next) {
    let userId = req.session.userId
    let sqlQuery = "SELECT * FROM Goals WHERE user_id = ?"

    db.query(sqlQuery, [userId], (err, results) => {
        if (err) {
            next(err)
        }

        // Pass the goals data to the EJS template
        res.render("goals.ejs", { goals: results, user: userId})
    });
});

router.post('/addgoal', async (req, res) => {
    let userId = req.session.userId
    let sqlquery = "INSERT INTO goals (user_id, goal_type, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)"

    let data = [userId, req.body.goaltype, req.body.startyear + "-" + req.body.startmonth + "-" + req.body.startday, 
        req.body.endyear + "-" + req.body.endmonth + "-" + req.body.endday, req.body.status
    ]

    db.query(sqlquery, data, (err, result) => {
        if (err) {
            next(err)
        }
        else {
            res.send('Added, congrats!!')
        }
    })
});

module.exports = router;