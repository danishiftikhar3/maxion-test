export type ErrorResponse = {
  error: string | ErrorValidation | null;
};

export type ErrorValidation = { [key: string]: string };
