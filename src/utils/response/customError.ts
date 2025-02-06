import { ErrorResponse, ErrorValidation } from "../../types/error";

export class CustomError extends Error {
  private httpStatusCode: number;
  private error: string | ErrorValidation | null;

  constructor(httpStatusCode: number, error: string | ErrorValidation | null = null) {
    super();

    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.error = error;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      error: this.error,
    };
  }
}
