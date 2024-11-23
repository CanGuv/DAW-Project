CREATE DATABASE fitnesshealth;
USE fitnesshealth;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    age INT,
    gender ENUM ('male', 'female', 'other'),
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(4,1)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Workouts (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    workout_type VARCHAR(100),
    duration_minutes INT,
    intensity ENUM('Low', 'Medium', 'High'),
    calories_burned DECIMAL(5,2),
    workout_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT
);

CREATE TABLE Workout_Exercises (
    workout_id INT NOT NULL,
    exercise_id INT NOT NULL AUTO_INCREMENT,
    exercise_name VARCHAR(255),
    sets INT,
    reps INT,
    weight_kg DECIMAL(5, 2),
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (workout_id) REFERENCES Workouts(workout_id)
);


-- CREATE TABLE Workout_Exercises (
--     workout_id INT,
--     exercise_id INT,
--     sets INT,
--     reps INT,
--     weight_kg DECIMAL(5,2),
--     PRIMARY KEY (workout_id, exercise_id),
--     FOREIGN KEY (workout_id) REFERENCES Workouts(workout_id) ON DELETE CASCADE,
--     FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id) ON DELETE CASCADE
-- );

CREATE TABLE Health_Metrics (
    metric_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    weight_kg DECIMAL(5,2),
    body_fat_percentage DECIMAL(5,2),
    muscle_mass_kg DECIMAL(5,2),
    metric_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Goals (
    goal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    goal_type ENUM('Weight Loss', 'Strength', 'Endurance', 'Flexibility'),
    start_date DATE,
    end_date DATE,
    status ENUM('In Progress', 'Completed', 'Failed') DEFAULT 'In Progress',
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE USER IF NOT EXISTS 'fitnesshealth_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON fitnesshealth.* TO 'fitnesshealth_app'@'localhost';