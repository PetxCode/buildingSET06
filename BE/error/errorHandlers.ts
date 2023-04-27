import { Request, Response, NextFunction } from "express";
import { HTTP } from "../constants/HTTP";
import { mainAppErrorHandler } from "./errorDefiner";

const errorBuilder = (err: mainAppErrorHandler, res: Response) => {
  res.status(HTTP.INTERNAL_SERVER_ERROR).json({
    name: err.name,
    message: err.message,
    status: err.status,
    stack: err.stack,
    error: err,
  });
};

export const errorHandler = (
  err: mainAppErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  errorBuilder(err, res);
};
