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

## How to run the application
### Prerequisites
- Node.js installed on your computer (https://nodejs.org/en/download/source-code).
- MySQL installed and set up (https://www.mysql.com/downloads/).
- A terminal or command line tool.

### Steps to set up and run
1. Clone the Repository, open a terminal and run:
   ```bash
   git clone https://github.com/CanGuv/DAW-Project
   ```
2. Navigate to the project directory
   ```bash
   cd your-repository
   ```
3. Install dependencies run the following command to install the required dependencies:
   ```bash
   npm install
   ```
4. Set up the Database
  Run the SQL Files, open MySQL from the command line and log in using the following command:
  ```bash
  mysql -u root -p
  ```
  Once logged in, run the following commands to create the database and insert sample data:
  ```bash
  SOURCE /path/to/create_db.sql;
  SOURCE /path/to/insert_data.sql;
  ```
5. Run application
   ```bash
   node index.js
   ```
   
## Contributing
If you'd like to contribute, please fork the repo and create a pull request.

## License
This project is licensed under the MIT License.
