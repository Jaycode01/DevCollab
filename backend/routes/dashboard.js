import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getDashboard,
  savedDashbaord,
  addNewProject,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", authenticateToken, getDashboard);
router.post("/", authenticateToken, savedDashbaord);
router.post("/add-project", authenticateToken, addNewProject);

export default router;
