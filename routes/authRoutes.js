import { Router } from "express";
import {
  registerUser,
  loginUser,
  editWeight,
} from "../controllers/authController.js";

const router = Router();
router.post("/register", registerUser);

router.post("/login", loginUser);
router.put("/updateWeight/:userId", editWeight);

export default router;
