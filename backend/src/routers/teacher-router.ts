import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeacherById,
  updateTeacher,
} from "../controllers/teacher-controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = express.Router();

router.get("/", verifyToken, getTeacher);
router.post("/", verifyToken, createTeacher);
router.get("/:id", verifyToken, getTeacherById);
router.put("/:id", verifyToken, updateTeacher);
router.delete("/:id", verifyToken, deleteTeacher);

export default router;
