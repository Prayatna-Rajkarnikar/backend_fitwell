import { Router } from "express";
import {
  setWaterGoal,
  addWaterIntake,
  getDailyIntake,
} from "../controllers/waterIntakeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/set-goal", authMiddleware, setWaterGoal);
router.post("/add", authMiddleware, addWaterIntake);
router.get("/daily", authMiddleware, getDailyIntake);

export default router;
