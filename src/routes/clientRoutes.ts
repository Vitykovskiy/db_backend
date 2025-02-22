import { Router } from "express";
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController";

const router = Router();

router.get("/", getClients);
router.post("/", addClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
