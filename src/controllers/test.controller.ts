import { NextFunction, Request, Response } from "express";

import { CustomError } from "../utils/response/customError";

export const TestResult = async (req: Request, res: Response, next: NextFunction) => {


  try {
 
    return res.status(200).json({ message: "Test result Passed" });
  } catch (err) {
    const customError = new CustomError(500, `Error ${err.message}`);
    return next(customError);
  }
};
