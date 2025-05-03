import { Router } from "express";
import {
  calculateCalories,
  getTotalCaloriesBurned,
  editWeight,
} from "../controllers/fitnessController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/calculateCalorie", authMiddleware, calculateCalories);
router.get("/getTotalCaloriesBurned", authMiddleware, getTotalCaloriesBurned);
router.put("/editWeight", authMiddleware, editWeight);

export default router;
