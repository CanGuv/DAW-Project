const express = require("express")
const request = require('request')
const router = express.Router()

router.get('/nutrition', function (req, res, next) {
    let appID = "44e39d16"
    let appKey = "3934f30aa303a8275456a0fae9750ddd"
    let ingr = req.query.ingr

    let url = `https://api.edamam.com/api/nutrition-data?app_id=${appID}&app_key=${appKey}&ingr=${ingr}`;

    request(url, function (err, response, body) {
        if (err) {
            next(err);
        } else {
            // Parse the response and extract the necessary data
            let nutrition = JSON.parse(body);
            
            res.render('nutrition', { nutrition: nutrition, ingr: ingr, user: req.session.userId });
        }
    });
});

module.exports = router;