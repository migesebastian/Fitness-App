const express = require('express');
const verifyToken = require('../middleware/verify-token');
const { User, FitnessGoal, ProgressPicture, Workout, Exercise, Meal } = require('../models/workout');

const router = express.Router();
// ========= Protected Routes =========
router.use(verifyToken);

module.exports = router;