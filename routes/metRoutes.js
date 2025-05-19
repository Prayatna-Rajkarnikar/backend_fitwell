import { Router } from "express";
import { addMetValue, getAllActivity } from "../controllers/metController.js";

const router = Router();

router.post("/addMet", addMetValue);
router.get("/getAllActivity", getAllActivity);

export default router;
