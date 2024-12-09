import { loginSchema } from "../utils/login-schema";
import { registerSchema } from "../utils/register-schema";
import { sign, verify } from "jsonwebtoken";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import * as yup from "yup";
import prisma from "../config/prisma";

export const register = async (req: Request, res: Response) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });

    const { username, email } = req.body;
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.json({
        status: "error",
        message: "User already exist",
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: await hash(req.body.password, await genSalt(10)),
      },
    });
    res.status(201).json({
      status: "success",
      message: "You have successfully registered.",
      data: user,
    });
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        status: "error",
        message: error.errors,
      });
    }
    res.status(400).json({ error: "An unexpacted error occured" });
  }
};

export async function login(req: Request, res: Response) {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;
    console.log(email, password);
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    console.log(user);

    if (!user || !user.password) {
      return res.json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const invalidPassword = await compare(password, user.password);
    if (!invalidPassword) {
      return res.json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const jwtPayload = {
      username: user.username,
      email: user.email,
    };
    const token = await sign(jwtPayload, "mySecret", {
      expiresIn: "12h",
    });

    const data = {
      username: user.username,
      email: user.email,
      id: user.id,
    };

    res.status(200).json({
      status: "success",
      message: "You have successfully logged in",
      data,
      token,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        status: "error",
        message: error.errors,
      });
    }
    res.status(400).json({ error: "An unexpected error occurred" });
  }
}
