INSERT INTO Goals (user_id, goal_type, start_date, end_date, status) VALUES
(1, 'Endurance', '2024-09-20', '2024-11-20', 'Failed'),
(1, 'Strength', '2024-09-15', '2024-11-15', 'Failed'),
(1, 'Flexibility', '2024-09-10', '2024-11-10', 'Completed'),
(1, 'Endurance', '2024-09-05', '2024-11-05', 'Completed'),
(1, 'Strength', '2024-09-01', '2024-11-01', 'Completed'),
(1, 'Weight Loss', '2024-10-20', '2024-12-20', 'In Progress'),
(1, 'Flexibility', '2024-10-15', '2024-12-15', 'In Progress'),
(1, 'Endurance', '2024-10-10', '2024-12-10', 'In Progress'),
(1, 'Strength', '2024-10-05', '2024-12-05', 'In Progress'),
(1, 'Weight Loss', '2024-10-01', '2024-12-01', 'In Progress');


INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Cardio', 30, 'Medium', 250.00, '2024-01-05'),
(1, 'Strength', 45, 'High', 400.00, '2024-01-15'),
(1, 'Yoga', 60, 'Low', 150.00, '2024-01-25');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'HIIT', 20, 'High', 300.00, '2024-02-03'),
(1, 'Swimming', 60, 'Medium', 450.00, '2024-02-20');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Cycling', 40, 'Medium', 350.00, '2024-03-08'),
(1, 'Strength', 50, 'High', 500.00, '2024-03-15'),
(1, 'Pilates', 55, 'Low', 200.00, '2024-03-22'),
(1, 'Running', 35, 'High', 380.00, '2024-03-30');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Running', 30, 'High', 400.00, '2024-04-02'),
(1, 'Yoga', 45, 'Low', 120.00, '2024-04-10'),
(1, 'Swimming', 50, 'Medium', 420.00, '2024-04-18');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Cycling', 45, 'Medium', 400.00, '2024-05-05'),
(1, 'Strength', 60, 'High', 550.00, '2024-05-10'),
(1, 'HIIT', 25, 'High', 320.00, '2024-05-15'),
(1, 'Yoga', 40, 'Low', 150.00, '2024-05-20'),
(1, 'Pilates', 50, 'Low', 220.00, '2024-05-28');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Swimming', 60, 'Medium', 480.00, '2024-06-10'),
(1, 'Cycling', 50, 'Medium', 420.00, '2024-06-25');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Running', 30, 'High', 400.00, '2024-07-02'),
(1, 'HIIT', 20, 'High', 300.00, '2024-07-08'),
(1, 'Strength', 50, 'High', 500.00, '2024-07-15'),
(1, 'Yoga', 45, 'Low', 120.00, '2024-07-18'),
(1, 'Cycling', 40, 'Medium', 350.00, '2024-07-22'),
(1, 'Swimming', 60, 'Medium', 450.00, '2024-07-28');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Cycling', 50, 'Medium', 420.00, '2024-08-05'),
(1, 'Running', 35, 'High', 380.00, '2024-08-12'),
(1, 'Yoga', 60, 'Low', 150.00, '2024-08-25');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'HIIT', 30, 'High', 350.00, '2024-09-03'),
(1, 'Strength', 55, 'High', 520.00, '2024-09-10'),
(1, 'Cycling', 40, 'Medium', 350.00, '2024-09-20'),
(1, 'Yoga', 45, 'Low', 130.00, '2024-09-27');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Running', 40, 'High', 450.00, '2024-10-02'),
(1, 'Swimming', 55, 'Medium', 480.00, '2024-10-08'),
(1, 'Strength', 60, 'High', 540.00, '2024-10-15'),
(1, 'Yoga', 50, 'Low', 160.00, '2024-10-20'),
(1, 'Cycling', 45, 'Medium', 400.00, '2024-10-30');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Running', 30, 'High', 400.00, '2024-11-05'),
(1, 'Yoga', 60, 'Low', 150.00, '2024-11-18');

INSERT INTO Workouts (user_id, workout_type, duration_minutes, intensity, calories_burned, workout_date) VALUES 
(1, 'Cycling', 50, 'Medium', 420.00, '2024-12-05'),
(1, 'Strength', 55, 'High', 530.00, '2024-12-15'),
(1, 'Yoga', 40, 'Low', 150.00, '2024-12-22');


INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(1, 3, 10, 0.00, 'Jogging Warm-Up'),
(2, 4, 8, 50.00, 'Bench Press'),
(2, 4, 12, 30.00, 'Bicep Curl'),          
(3, 3, 15, 0.00, 'Downward Dog Pose');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(4, 5, 10, 0.00, 'Mountain Climbers'),
(5, 3, 20, 0.00, 'Freestyle Swimming');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(6, 3, 10, 0.00, 'Hill Cycling'),
(7, 5, 8, 60.00, 'Deadlift'),
(8, 4, 10, 0.00, 'Plank Leg Lifts'),
(9, 3, 12, 0.00, 'Interval Running');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(10, 3, 15, 0.00, 'Sprint Intervals'),
(11, 4, 12, 0.00, 'Warrior Pose'),
(12, 5, 10, 0.00, 'Butterfly Stroke');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(13, 4, 8, 0.00, 'Trail Cycling'),
(14, 4, 6, 70.00, 'Squats'),
(15, 5, 12, 0.00, 'Burpees'),
(16, 3, 15, 0.00, 'Cat-Cow Pose'),
(17, 4, 10, 0.00, 'Roll-Ups');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(18, 3, 12, 0.00, 'Backstroke'),
(19, 5, 10, 0.00, 'Interval Cycling');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(20, 4, 12, 0.00, 'Stadium Running'),
(21, 5, 10, 0.00, 'Jump Squats'),
(22, 4, 8, 60.00, 'Bench Press'),
(23, 3, 20, 0.00, 'Child Pose'),
(24, 3, 15, 0.00, 'Mountain Cycling'),
(25, 4, 15, 0.00, 'Breaststroke');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(26, 3, 12, 0.00, 'Road Cycling'),
(27, 4, 8, 0.00, 'Hill Sprints'),
(28, 4, 15, 0.00, 'Bridge Pose');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(29, 5, 12, 0.00, 'High Knees'),
(30, 4, 10, 65.00, 'Overhead Press'),
(31, 3, 10, 0.00, 'Trail Cycling'),
(32, 3, 15, 0.00, 'Pigeon Pose');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(33, 3, 15, 0.00, 'Hill Running'),
(34, 4, 12, 0.00, 'Butterfly Stroke'),
(35, 5, 8, 70.00, 'Leg Press'),
(36, 3, 20, 0.00, 'Tree Pose'),
(37, 4, 10, 0.00, 'Spin Cycling');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(38, 4, 12, 0.00, 'Sprint Intervals'),
(39, 3, 15, 0.00, 'Seated Forward Bend');

INSERT INTO Workout_Exercises (workout_id, sets, reps, weight_kg, exercise_name) VALUES 
(40, 3, 12, 0.00, 'Endurance Cycling'),
(41, 4, 10, 55.00, 'Chest Press'),
(42, 3, 20, 0.00, 'Corpse Pose');