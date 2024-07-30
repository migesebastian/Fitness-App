const mongoose = require('mongoose');

// Define Exercise Schema first since it's used in Workout Schema
const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: Number,
  weight: Number,
});

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profilePicture: { type: String },
  fitnessGoals: { type: [String] },
});

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  exercises: [ExerciseSchema],
});

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: String, required: true },
  progress: { type: String },
  targetDate: { type: Date },
});

const MealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  foodItems: { type: [String] },
  calories: { type: Number },
});

const ProgressPictureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  pictureURL: { type: String, required: true },
});

// Create Models
const Profile = mongoose.model('Profile', ProfileSchema);
const FitnessGoal = mongoose.model('FitnessGoal', GoalSchema);
const ProgressPicture = mongoose.model('ProgressPicture', ProgressPictureSchema);
const Workout = mongoose.model('Workout', WorkoutSchema);
const Exercise = mongoose.model('Exercise', ExerciseSchema);
const Meal = mongoose.model('Meal', MealSchema);

// Export Models
module.exports = {
  Profile,
  FitnessGoal,
  ProgressPicture,
  Workout,
  Exercise,
  Meal
};
