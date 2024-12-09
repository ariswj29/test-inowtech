import express from "express";
import {
  createClass,
  deleteClass,
  getClass,
  getClassById,
  updateClass,
} from "../controllers/class-controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = express.Router();

router.get("/", verifyToken, getClass);
router.post("/", verifyToken, createClass);
router.get("/:id", verifyToken, getClassById);
router.put("/:id", verifyToken, updateClass);
router.delete("/:id", verifyToken, deleteClass);

export default router;
