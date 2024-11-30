// Import the Express framework
const express = require("express")
// Import the request library
const request = require('request')
// Create a new router instance
const router = express.Router()

router.get('/nutrition', function (req, res, next) {
    // Define the application ID and key for the Edamam Nutrition Analysis API
    let appID = "44e39d16"
    let appKey = "3934f30aa303a8275456a0fae9750ddd"

    // Get the ingredient from the query string
    let ingr = req.query.ingr

    // Define the API endpoint URL
    let url = `https://api.edamam.com/api/nutrition-data?app_id=${appID}&app_key=${appKey}&ingr=${ingr}`;

    // Make a GET request to the API endpoint
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