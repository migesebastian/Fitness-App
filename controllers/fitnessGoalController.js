const express = require('express');
const verifyToken = require('../middleware/verify-token');
const { FitnessGoal } = require('../models/workout');
const router = express.Router();

// ========= Protected Routes =========
router.use(verifyToken);

// Create a new fitness goal
router.post('/', async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const fitnessGoal = await FitnessGoal.create(req.body);
    res.status(201).json(fitnessGoal);
  } catch (error) {
    console.error('Error creating fitness goal:', error);
    res.status(500).json({ error: 'Server error, could not create fitness goal.' });
  }
});

// Get all fitness goals for the logged-in user
router.get('/', async (req, res) => {
  try {
    const fitnessGoals = await FitnessGoal.find({ userId: req.user._id });
    res.status(200).json(fitnessGoals);
  } catch (error) {
    console.error('Error fetching fitness goals:', error);
    res.status(500).json({ error: 'Server error, could not fetch fitness goals.' });
  }
});

// Update a specific fitness goal by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedGoal = await FitnessGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ error: 'Fitness goal not found.' });
    }
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error('Error updating fitness goal:', error);
    res.status(500).json({ error: 'Server error, could not update fitness goal.' });
  }
});

// Delete a specific fitness goal by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedGoal = await FitnessGoal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ error: 'Fitness goal not found.' });
    }
    res.status(200).json(deletedGoal);
  } catch (error) {
    console.error('Error deleting fitness goal:', error);
    res.status(500).json({ error: 'Server error, could not delete fitness goal.' });
  }
});

module.exports = router;
