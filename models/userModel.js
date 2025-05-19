import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  waterGoalMl: {
    type: Number,
    default: 1000,
  },
  weightKg: { type: Number, required: true, default: 0 },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
