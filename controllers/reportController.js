import calorieRecord from "../models/calorieModel.js";
import waterModel from "../models/waterModel.js";

export const getUserDailyReport = async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  if (!date) {
    return res
      .status(400)
      .json({ error: "Date query is required in YYYY-MM-DD format." });
  }

  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    // Water intake records
    const waterLogs = await waterModel.find({
      userId,
      date: { $gte: start, $lt: end },
    });

    // Calorie burn records
    const calorieLogs = await calorieRecord.find({
      userId,
      createdAt: { $gte: start, $lt: end },
    });

    const totalWater = waterLogs.reduce(
      (sum, log) => sum + log.amountLiters,
      0
    );
    const totalCalories = calorieLogs.reduce(
      (sum, log) => sum + log.caloriesBurned,
      0
    );

    res.json({
      date,
      userId,
      waterIntakeLiters: totalWater,
      caloriesBurned: totalCalories,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
