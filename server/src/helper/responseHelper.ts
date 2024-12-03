import { Response } from "express";
import { SERVER_ERROR, SUCCESS } from "../constant/httpStatusCode";

export const successResponse = (
  res: Response,
  message: string = "Success",
  data: Record<string, any>,
  statusCode: number = SUCCESS
) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = SERVER_ERROR
) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
