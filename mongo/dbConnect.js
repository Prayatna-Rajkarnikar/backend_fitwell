import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};
