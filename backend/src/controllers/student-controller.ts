import prisma from "../config/prisma";
import { Request, Response } from "express";

export const getStudent = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 8;

    const skip = (page - 1) * limit;

    const students = await prisma.student.findMany({
      include: {
        class: true,
        parent: true,
      },
      skip,
      take: limit ? Number(limit) : 8,
    });

    const totalStudents = await prisma.student.count();
    const totalPages = Math.ceil(totalStudents / limit);

    res.status(200).json({
      message: "Get data students successfully",
      data: students,
      meta: {
        totalItems: totalStudents,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  const {
    name,
    nisn,
    dateBirth,
    placeBirth,
    address,
    noPhone,
    gender,
    parentId,
    classId,
  } = req.body;

  console.log(req.body, "req.body");

  try {
    const student = await prisma.student.create({
      data: {
        name,
        nisn,
        dateBirth: new Date(dateBirth),
        placeBirth,
        address,
        noPhone,
        gender: "MALE",
        parentId: Number(parentId),
        classId: Number(classId),
      },
    });

    res
      .status(201)
      .json({ message: "Create new student successfully", data: student });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const student = await prisma.student.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Get student by id successfully", data: student });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    nisn,
    dateBirth,
    placeBirth,
    address,
    noPhone,
    gender,
    classId,
    parentId,
  } = req.body;

  try {
    const student = await prisma.student.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        nisn,
        dateBirth: new Date(dateBirth),
        placeBirth,
        address,
        noPhone,
        gender: "MALE",
        parentId: Number(parentId),
        classId: Number(classId),
      },
    });

    res
      .status(200)
      .json({ message: "Update student successfully", data: student });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.student.delete({
      where: {
        id: parseInt(id),
      },
    });

    res
      .status(200)
      .json({ status: "success", message: "Delete student successfully" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
