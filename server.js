import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import fitnessRoutes from "./routes/fitnessRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("combined"));

dbConnect();

app.use("/auth", authRoutes);
app.use("/fitness", fitnessRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
