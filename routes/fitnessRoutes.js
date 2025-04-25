import { Router } from "express";
import { calculateCalories } from "../controllers/fitnessController.js";

const router = Router();

// Route to calculate calories burned
router.post("/calculate", calculateCalories);

export default router;
