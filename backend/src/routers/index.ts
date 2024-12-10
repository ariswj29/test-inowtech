import express from "express";
import classRouter from "./class-router";
import studentRouter from "./student-router";
import teacherRouter from "./teacher-router";
import authRouter from "./auth-router";
import { dashboard } from "../controllers/auth-controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/classes", classRouter);
router.use("/api/students", studentRouter);
router.use("/api/teachers", teacherRouter);
router.get("/api/dashboard", verifyToken, dashboard);

export default router;
