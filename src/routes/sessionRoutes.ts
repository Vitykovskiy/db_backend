import { Router } from "express";
import {
  createSession,
  deleteSession,
  getSessions,
  updateSession,
  updateSessionStatus,
} from "../controllers/sessionController";

const router = Router();

router.get("/", getSessions);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);
router.put("/:id/status", updateSessionStatus);

export default router;
