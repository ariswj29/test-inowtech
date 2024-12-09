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

router.get("/", getStudent);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
