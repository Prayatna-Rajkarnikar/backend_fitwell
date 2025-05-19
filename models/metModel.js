import mongoose from "mongoose";

const metSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const metModel = mongoose.model("MET", metSchema);
export default metModel;
