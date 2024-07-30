
const express = require('express');
const verifyToken = require('../middleware/verify-token');
const { ProgressPicture } = require('../models/workout');
const router = express.Router();

// ========= Protected Routes =========
router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const progressPicture = await ProgressPicture.create(req.body);
        res.status(201).json(progressPicture);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const progressPictures = await ProgressPicture.find({ userId: req.user._id });
        res.status(200).json(progressPictures);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
