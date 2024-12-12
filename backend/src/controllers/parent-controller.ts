import prisma from "../config/prisma";
import { Request, Response } from "express";

export const getParent = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 8;

    const skip = (page - 1) * limit;

    const Parents = await prisma.parent.findMany({
      skip,
      take: limit ? Number(limit) : 8,
      where: {
        id: {
          not: 1,
        },
      },
    });

    const totalParents = await prisma.parent.count();
    const totalPages = Math.ceil(totalParents / limit);

    res.status(200).json({
      message: "Get data Parents successfully",
      data: Parents,
      meta: {
        totalItems: totalParents,
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

export const createParent = async (req: Request, res: Response) => {
  const { name, noPhone, address } = req.body;

  try {
    const newParent = await prisma.parent.create({
      data: {
        name,
        noPhone,
        address,
      },
    });

    res
      .status(201)
      .json({ message: "Create new parent successfully", data: newParent });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const getParentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const parentById = await prisma.parent.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!parentById) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res
      .status(200)
      .json({ message: "Get parent by id successfully", data: parentById });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updateParent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, noPhone, address } = req.body;

  try {
    const updatedParent = await prisma.parent.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        noPhone,
        address,
      },
    });

    res
      .status(200)
      .json({ message: "Update parent successfully", data: updatedParent });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteParent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.parent.delete({
      where: {
        id: parseInt(id),
      },
    });

    res
      .status(200)
      .json({ status: "success", message: "Delete parent successfully" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
