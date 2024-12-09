import prisma from "../config/prisma";
import { Request, Response } from "express";

export const getTeacher = async (req: Request, res: Response) => {
  try {
    const teachers = await prisma.teacher.findMany();

    res
      .status(200)
      .json({ message: "Get data teachers successfully", data: teachers });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  const {
    name,
    nuptk,
    dateBirth,
    placeBirth,
    address,
    noPhone,
    gender,
    classId,
  } = req.body;

  try {
    const teacher = await prisma.teacher.create({
      data: {
        name,
        nuptk,
        dateBirth,
        placeBirth,
        address,
        noPhone,
        gender,
        classId: parseInt(classId),
      },
    });

    res
      .status(201)
      .json({ message: "Create new teacher successfully", data: teacher });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res
      .status(200)
      .json({ message: "Get teacher by id successfully", data: teacher });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    nuptk,
    dateBirth,
    placeBirth,
    address,
    noPhone,
    gender,
    classId,
  } = req.body;

  try {
    const teacher = await prisma.teacher.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        nuptk,
        dateBirth,
        placeBirth,
        address,
        noPhone,
        gender,
        classId: parseInt(classId),
      },
    });

    res
      .status(200)
      .json({ message: "Update teacher successfully", data: teacher });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.teacher.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Delete teacher successfully" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
