import calorieModel from "../models/calorieRecordModel.js";
import userModel from "../models/userModel.js";

const MET_VALUES = {
  running: 9.8,
  cycling: 7.5,
  walking: 3.5,
  swimming: 8.0,
  hiking: 6.0,
  jumping: 8.8,
  dancing: 5.5,
  yoga: 2.5,
  weightlifting: 6.0,
  aerobics: 7.3,
};

export const calculateCalories = async (req, res) => {
  const { activity, durationHours } = req.body;
  const { userId } = req.params;

  if (!activity || !durationHours) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const met = MET_VALUES[activity.toLowerCase()];
  if (!met) {
    return res.status(400).json({ error: "Invalid activity provided." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const weightKg = user.weightKg;
    const caloriesBurned = met * weightKg * durationHours;

    const newRecord = await calorieModel.create({
      userId,
      activity,
      MET: met,
      weightKg,
      durationHours,
      caloriesBurned,
    });

    res.json({
      message: "Calories calculated and saved successfully",
      record: newRecord,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to calculate calories", details: err.message });
  }
};
