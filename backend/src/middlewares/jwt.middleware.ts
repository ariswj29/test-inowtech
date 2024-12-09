import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type User = {
  username: string;
  email: string;
};

declare namespace Express {
  export interface Request {
    user?: User;
  }
}

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("Token not found");
      return res.status(401).send("Unauthorized: No token provided");
    }

    const verifyUser = verify(token, "mySecret");

    if (!verifyUser) {
      console.log("Token verification failed");
      return res.status(401).send("Unauthorized: Invalid token");
    }

    req.user = verifyUser as any;

    next();
  } catch (err) {
    console.log("Error during token verification:", err);
    res.status(500).send({
      message: "Internal server error",
      error: (err as Error).message,
    });
  }
};
