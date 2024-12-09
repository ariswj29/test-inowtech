import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudentById,
  updateStudent,
} from "../controllers/student-controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = express.Router();

router.get("/", verifyToken, getStudent);
router.post("/", verifyToken, createStudent);
router.get("/:id", verifyToken, getStudentById);
router.put("/:id", verifyToken, updateStudent);
router.delete("/:id", verifyToken, deleteStudent);

export default router;
