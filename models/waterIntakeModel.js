import mongoose from "mongoose";

const waterIntakeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amountMl: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const WaterIntake = mongoose.model("WaterIntake", waterIntakeSchema);
export default WaterIntake;
