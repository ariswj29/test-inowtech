import express from "express";
import classRouter from "./class-router";
import studentRouter from "./student-router";
import teacherRouter from "./teacher-router";
import authRouter from "./auth-router";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/classes", classRouter);
router.use("/api/students", studentRouter);
router.use("/api/teachers", teacherRouter);

export default router;
