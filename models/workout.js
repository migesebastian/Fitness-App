const mongoose = require('mongoose');

// Fitness Goal Schema
const fitnessGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goalDescription: {
    type: String,
    required: true
  }
});

// Progress Picture Schema
const progressPictureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pictureUrl: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Workout Schema
const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  }
});

// Meal Schema
const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealDetails: {
    type: String,
    required: true
  },
  mealDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  carbohydrates: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  }
});

// Create Models
const FitnessGoal = mongoose.model('FitnessGoal', fitnessGoalSchema);
const ProgressPicture = mongoose.model('ProgressPicture', progressPictureSchema);
const Workout = mongoose.model('Workout', workoutSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
const Meal = mongoose.model('Meal', mealSchema);

// Export Models
module.exports = {
  FitnessGoal,
  ProgressPicture,
  Workout,
  Exercise,
  Meal
};