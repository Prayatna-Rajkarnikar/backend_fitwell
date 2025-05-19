import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnect } from "./mongo/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import metRoutes from "./routes/metRoutes.js";
import fitnessRoutes from "./routes/fitnessRoutes.js";
import waterRoutes from "./routes/waterRoutes.js";

const app = express();
dotenv.config();

app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

dbConnect();

app.use("/auth", authRoutes);
app.use("/fitness", fitnessRoutes);
app.use("/water", waterRoutes); 
app.use("/met", metRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
