import { NextFunction, Request, Response } from "express";
import logger from "../helper/logger";

// Middleware to handle errors
export const errorHandler = (
  err: Record<string, any>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 500;
  logger.error(err.stack);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
