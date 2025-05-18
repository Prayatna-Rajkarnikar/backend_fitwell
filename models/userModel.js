import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  waterGoalMl: {
    type: Number,
    default: 1000, // 1000ml = 1L
  },
});


const userModel = mongoose.model("User", userSchema);

export default userModel;
