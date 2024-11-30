# Databases and Web project

## Description
This is a web application I created for my 'Databases and the web' module. It is an application created primarily using Node.js and MySQL - 
it is a fitness and health tracking application, where users can log their workouts and exercises, set goals and retrieve nutritional information on food.

## Features
- User registration and authentication.
- Dashboard displaying user workouts and goals with interactive charts (using Chart.js).
- Ability to log workouts, including type, duration, intensity, calories burned, and exercises.
- Ability to log goals; start date, end date, status.
- Search functionality for workout types and food nutritional information (via a public API).
- Secure password handling with bcrypt for hashing.
- Own API, giving access to exercises users are doing.

## Technologies
- Frontend: EJS templates, Chart.js
- Backend: Node.js, Express.js
- Database: MySQL
- Security: express-session, bcrypt, express-validator, express-sanitizer

## Contributing
If you'd like to contribute, please fork the repo and create a pull request.

## License
This project is licensed under the MIT License.
