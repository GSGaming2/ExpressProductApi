import express from "express";
import type { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
import Users from '../src/models/users.models.ts'
import type { AuthRequest } from "../src/constants/Auth.ts";

export const tokenAuthenticator = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userId: string };

    //attach identity here
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
