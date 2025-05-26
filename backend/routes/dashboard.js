import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getDashboard,
  savedDashbaord,
  addNewProject,
} from "../controllers/dashboardController.js";
import { verifyFirebaseToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getDashboard);
router.post("/", authenticateToken, savedDashbaord);
router.post("/add-project", verifyFirebaseToken, addNewProject);

export default router;
