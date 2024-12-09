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

router.get("/", getClass);
router.post("/", createClass);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
