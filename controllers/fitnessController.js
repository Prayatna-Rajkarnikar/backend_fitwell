import CalorieRecord from "../models/calorieRecordModel.js";

// MET_VALUES remains same
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
  const { activity, weightKg, durationHours, userId } = req.body;

  if (!activity || !weightKg || !durationHours) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const met = MET_VALUES[activity.toLowerCase()];
  if (!met) {
    return res.status(400).json({ error: "Invalid activity provided." });
  }

  const caloriesBurned = met * weightKg * durationHours;

  try {
    const newRecord = await CalorieRecord.create({
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
    res.status(500).json({ error: "Failed to save record", details: err.message });
  }
};
