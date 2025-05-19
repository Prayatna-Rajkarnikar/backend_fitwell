import metModel from "../models/metModel.js";

export const addMetValue = async (req, res) => {
  const { activity, value } = req.body;

  if (!activity || !value) {
    return res.status(400).json({ error: "Activity and value are required." });
  }

  try {
    const existing = await metModel.findOne({
      activity: activity.toLowerCase(),
    });
    if (existing) {
      return res.status(400).json({ error: "Activity already exists." });
    }

    const newMet = await metModel.create({
      activity: activity.toLowerCase(),
      value,
    });

    res
      .status(201)
      .json({ message: "MET value added successfully", met: newMet });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add MET value", details: err.message });
  }
};

export const getAllActivity = async (req, res) => {
  try {
    const metValues = await metModel
      .find({}, { activity: 1, _id: 0 })
      .sort({ activity: 1 });
    res.json({ activities: metValues });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch MET activities",
      details: err.message,
    });
  }
};
