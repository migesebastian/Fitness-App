const express = require('express');
const verifyToken = require('../middleware/verify-token');
const { FitnessGoal } = require('../models/workout');
const router = express.Router();

// ========= Protected Routes =========
router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const fitnessGoal = await FitnessGoal.create(req.body);
        res.status(201).json(fitnessGoal);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
