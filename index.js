// Import express and ejs
var express = require ('express')
var ejs = require('ejs')

//Import mysql module
var mysql = require('mysql2')

//Import validator module
var validator = require ('express-validator');

//Import sanitizer
const expressSanitizer = require('express-sanitizer');

//Import session module
var session = require ('express-session')

// Create the express application object
const app = express()
const port = 8000

app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css and statis js)
app.use(express.static(__dirname + '/public'))

// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'fitnesshealth_app',
    password: 'qwertyuiop',
    database: 'fitnesshealth'
})
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})
global.db = db

// Define our application-specific data
app.locals.fitnessData = {mainName: "Fitness and Health Tracker"}

app.use(expressSanitizer());

const homeRoutes = require('./routes/home');
app.use('/', homeRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/dashboard', dashboardRoutes);

const goalsRoutes = require('./routes/goals');
app.use('/goals', goalsRoutes);

const workoutsRoutes = require('./routes/workouts');
app.use('/workouts', workoutsRoutes);

const healthRoutes = require('./routes/health');
app.use('/health', healthRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))