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

router.get("/", getTeacher);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
