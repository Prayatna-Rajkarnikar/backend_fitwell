import { Router } from "express";
import {
  setWaterGoal,
  addWaterIntake,
  getDailyIntake,
} from "../controllers/waterIntakeController.js";

const router = Router();

router.post("/set-goal", setWaterGoal);
router.post("/add", addWaterIntake);
router.get("/daily", getDailyIntake);

export default router;
