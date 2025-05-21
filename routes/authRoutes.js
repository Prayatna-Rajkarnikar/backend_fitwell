import { Router } from "express";
import {
  registerUser,
  loginUser,
  editWeight,
} from "../controllers/authController.js";
import { getUserAllLogs } from "../controllers/reportController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/register", registerUser);

router.post("/login", loginUser);
router.put("/updateWeight/:userId", editWeight);
router.get("/report", authMiddleware, getUserAllLogs);

export default router;
