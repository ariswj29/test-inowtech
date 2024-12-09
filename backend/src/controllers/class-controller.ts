import prisma from "../config/prisma";
import { Request, Response } from "express";

export const getClass = async (req: Request, res: Response) => {
  try {
    const classes = await prisma.class.findMany();

    res
      .status(200)
      .json({ message: "Get data classes successfully", data: classes });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createClass = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const newClass = await prisma.class.create({
      data: {
        name,
        description,
      },
    });

    res
      .status(201)
      .json({ message: "Create new class successfully", data: newClass });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const classById = await prisma.class.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!classById) {
      return res.status(404).json({ message: "Class not found" });
    }

    res
      .status(200)
      .json({ message: "Get class by id successfully", data: classById });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedClass = await prisma.class.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
      },
    });

    res
      .status(200)
      .json({ message: "Update class successfully", data: updatedClass });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    res
      .status(200)
      .json({ status: "success", message: "Delete class successfully" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
