import express from "express";
import {
  createParent,
  deleteParent,
  getParent,
  getParentById,
  updateParent,
} from "../controllers/parent-controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = express.Router();

router.get("/", verifyToken, getParent);
router.post("/", verifyToken, createParent);
router.get("/:id", verifyToken, getParentById);
router.put("/:id", verifyToken, updateParent);
router.delete("/:id", verifyToken, deleteParent);

export default router;
