const express = require('express');
const verifyToken = require('../middleware/verify-token');
const User = require('../models/user');
const router = express.Router();

// ========= Protected Routes =========
router.use(verifyToken);

// Get user profile
router.get('/:userId', async (req, res) => {
    try {
        if (req.user._id !== req.params.userId){
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error('Profile not found.');
        }
        res.json({ user });
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

router.put('/:userId', async (req, res) => {
    try {
        if (req.user._id !== req.params.userId) {
            return res.status(403).send("You're not allowed to do that!");
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;
