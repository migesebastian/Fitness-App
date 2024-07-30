const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/user');
const profilesRouter = require('./controllers/profileController');
const fitnessGoalController = require('./controllers/fitnessGoalController');
const progressPictureController = require('./controllers/progressPictureController');
const workoutController = require('./controllers/workoutController');
const exerciseController = require('./controllers/exerciseController');
const mealController = require('./controllers/mealController');


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/fitness-goals', fitnessGoalController);
app.use('/progress-pictures', progressPictureController);
app.use('/workouts', workoutController);
app.use('/exercises', exerciseController);
app.use('/meals', mealController);


app.listen(3000, () => {
    console.log('The express app is ready!');
});