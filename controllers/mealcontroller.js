const express = require('express');
const verifyToken = require('../middleware/verify-token');
const { Meal } = require('../models/workout');
const router = express.Router();

// ========= Protected Routes =========
router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const meal = await Meal.create(req.body);
        res.status(201).json(meal);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.user._id }).sort({ mealDate: 'desc' });
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:mealId', async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.mealId);

        if (!meal.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const updatedMeal = await Meal.findByIdAndUpdate(req.params.mealId, req.body, { new: true });
        res.status(200).json(updatedMeal);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:mealId', async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.mealId);

        if (!meal.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const deletedMeal = await Meal.findByIdAndDelete(req.params.mealId);
        res.status(200).json(deletedMeal);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;