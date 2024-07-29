const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const { FitnessGoal, ProgressPicture, Workout, Exercise, Meal } = require('../models/workout.js');
const router = express.Router();

// Middleware to verify the user's token
router.use(verifyToken);

// ------------------- Fitness Goals -------------------

// Create a new fitness goal
router.post('/goals', async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const goal = await FitnessGoal.create(req.body);
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all fitness goals for the authenticated user
router.get('/goals', async (req, res) => {
  try {
    const goals = await FitnessGoal.find({ userId: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit a fitness goal
router.put('/goals/:id', async (req, res) => {
  try {
    const goal = await FitnessGoal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a fitness goal
router.delete('/goals/:id', async (req, res) => {
  try {
    const goal = await FitnessGoal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------------- Progress Pictures -------------------

// Upload a new progress picture
router.post('/progress-pictures', async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const picture = await ProgressPicture.create(req.body);
    res.status(201).json(picture);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all progress pictures for the authenticated user
router.get('/progress-pictures', async (req, res) => {
  try {
    const pictures = await ProgressPicture.find({ userId: req.user._id }).sort({ uploadDate: 'desc' });
    res.status(200).json(pictures);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit a progress picture (e.g., description or other metadata)
router.put('/progress-pictures/:id', async (req, res) => {
  try {
    const picture = await ProgressPicture.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!picture) return res.status(404).json({ message: 'Picture not found' });
    res.status(200).json(picture);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a progress picture
router.delete('/progress-pictures/:id', async (req, res) => {
  try {
    const picture = await ProgressPicture.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!picture) return res.status(404).json({ message: 'Picture not found' });
    res.status(200).json({ message: 'Picture deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------------- Workouts -------------------

// Log a new workout
router.post('/workouts', async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all workouts for the authenticated user
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({ workoutDate: 'desc' });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit a workout
router.put('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a workout
router.delete('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------------- Exercises -------------------

// Log a new exercise to a workout
router.post('/exercises', async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all exercises for a specific workout
router.get('/exercises/:workoutId', async (req, res) => {
  try {
    const exercises = await Exercise.find({ workoutId: req.params.workoutId });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit an exercise
router.put('/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete an exercise
router.delete('/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndDelete({ _id: req.params.id });
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------------- Meals -------------------

// Log a new meal
router.post('/meals', async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all meals for the authenticated user
router.get('/meals', async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user._id }).sort({ mealDate: 'desc' });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit a meal
router.put('/meals/:id', async (req, res) => {
  try {
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a meal
router.delete('/meals/:id', async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
