import { Router } from "express";
import {
  calculateCalories,
  getTotalCaloriesBurned,
} from "../controllers/fitnessController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/calculateCalorie", authMiddleware, calculateCalories);
router.get("/getTotalCaloriesBurned", authMiddleware, getTotalCaloriesBurned);

export default router;
