import { Request, Response, NextFunction } from "express";

import { CustomError } from "../utils/response/customError";
import { logger } from "../utils/winston";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`status: ${err.HttpStatusCode}, message: ${JSON.stringify(err.JSON)}`);
  return res.status(err.HttpStatusCode || 500).json(err.JSON);
};
