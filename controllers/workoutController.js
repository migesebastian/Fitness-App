const express = require('express');
const verifyToken = require('../middleware/verify-token');
const { Workout } = require('../models/workout');
const router = express.Router();

// ========= Protected Routes =========
router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user._id }).sort({ workoutDate: 'desc' });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
