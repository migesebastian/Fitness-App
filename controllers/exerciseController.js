const express = require('express');
const { Exercise } = require('../models/workout');
const router = express.Router();

// Add exercise to workout
router.post('/:workoutId/exercises', async (req, res) => {
  try {
    req.body.workoutId = req.params.workoutId;
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get exercises for a workout
router.get('/:workoutId/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find({ workoutId: req.params.workoutId });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
