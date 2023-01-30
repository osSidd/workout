const express = require('express');

const workout = require('../controllers/workoutController');
const router = express.Router();

//routes

//get all workouts
router.get('/', workout.getWorkouts);

//get a single workout
router.get('/:id', workout.getWorkout);

//post a new workout
router.post('/', workout.createWorkout);

//delete a single workout
router.delete('/:id', workout.deleteWorkout);

//Update a single workout
router.patch('/:id', workout.updateWorkout);


module.exports = router;