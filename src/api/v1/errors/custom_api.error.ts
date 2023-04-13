import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  statusCode: number;

  constructor({ message = 'Something went wrong try again later', statusCode = StatusCodes.INTERNAL_SERVER_ERROR }: { message?: string, statusCode?: number }) {
    super(message),
      this.statusCode = statusCode;
  }
}

export default CustomAPIError