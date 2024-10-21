import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';

export class ErrorHandler {
  static handle = (
    err: ApiError,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const statusCode: number =
      err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res
      .status(statusCode)
      .send({ success: false, message: err.message });
  };
}
