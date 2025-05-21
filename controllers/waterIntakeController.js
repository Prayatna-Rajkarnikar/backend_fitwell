import WaterIntake from "../models/waterIntakeModel.js";
import User from "../models/userModel.js";

export const setWaterGoal = async (req, res) => {
  const { waterGoalMl } = req.body;
  const { id: userId } = req.user;

  if (!waterGoalMl)
    return res.status(400).json({ error: "User ID and water goal required" });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { waterGoalMl },
      { new: true }
    );

    res.json({ message: "Water goal updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to set goal", details: err.message });
  }
};

export const addWaterIntake = async (req, res) => {
  const { amountMl } = req.body;
  const { id: userId } = req.user;

  if (!userId || !amountMl)
    return res
      .status(400)
      .json({ error: "User ID and intake amount (ml) required" });

  try {
    const record = await WaterIntake.create({ userId, amountMl });
    res.status(201).json({
      message: "Water intake logged",
      record,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add intake", details: err.message });
  }
};

export const getDailyIntake = async (req, res) => {
  const { id: userId } = req.user;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const goalMl = user.waterGoalMl;

    const intakeRecords = await WaterIntake.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalMl = intakeRecords.reduce(
      (sum, record) => sum + record.amountMl,
      0
    );
    const metGoal = totalMl >= goalMl;

    res.json({
      message: "Daily water intake fetched",
      goalMl,
      totalIntakeMl: totalMl,
      metGoal,
      records: intakeRecords,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: err.message });
  }
};

export const resetDailyIntake = async (req, res) => {
  const { id: userId } = req.user;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    // Delete all water intake records for this user for today
    const result = await WaterIntake.deleteMany({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json({
      message: "Daily water intake reset",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to reset daily intake", details: err.message });
  }
};
