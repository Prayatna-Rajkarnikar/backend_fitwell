import mongoose from "mongoose";

const calorieRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: false, // Set to true if tracking per user
    },
    activity: {
      type: String,
      required: true,
    },
    MET: {
      type: Number,
      required: true,
    },
    durationHours: {
      type: Number,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const calorieRecord = mongoose.model("CalorieRecord", calorieRecordSchema);

export default calorieRecord;
