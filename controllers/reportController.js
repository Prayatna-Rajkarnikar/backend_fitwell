import calorieRecord from "../models/calorieRecordModel.js";
import waterModel from "../models/waterIntakeModel.js";

export const getUserAllLogs = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const waterLogs = await waterModel.find({ userId }).sort({ createdAt: -1 });
    const calorieLogs = await calorieRecord
      .find({ userId })
      .sort({ createdAt: -1 });

    const totalCalories = calorieLogs.reduce(
      (sum, log) => sum + log.caloriesBurned,
      0
    );

    const totalWaterAmount = waterLogs.reduce(
      (sum, log) => sum + log.amountMl,
      0
    );

    res.json({
      userId,
      totalCaloriesBurned: totalCalories,
      totalWaterIntakeMl: totalWaterAmount,
      totalWaterLogs: waterLogs.length,
      totalCalorieLogs: calorieLogs.length,
      waterLogs,
      calorieLogs,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
