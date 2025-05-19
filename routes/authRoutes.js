import { Router } from "express";
import {
  registerUser,
  loginUser,
  editWeight,
} from "../controllers/authController.js";
import { getUserDailyReport } from "../controllers/reportController.js";

const router = Router();
router.post("/register", registerUser);

router.post("/login", loginUser);
router.put("/updateWeight/:userId", editWeight);
router.get("/report/:userId", getUserDailyReport);

export default router;
