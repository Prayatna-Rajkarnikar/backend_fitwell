import { Router } from "express";
import {
  setWaterGoal,
  addWaterIntake,
  getDailyIntake,
  resetDailyIntake,
} from "../controllers/waterIntakeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/set-goal", authMiddleware, setWaterGoal);
router.post("/add", authMiddleware, addWaterIntake);
router.get("/daily", authMiddleware, getDailyIntake);
router.post("/reset", authMiddleware, resetDailyIntake);

export default router;
