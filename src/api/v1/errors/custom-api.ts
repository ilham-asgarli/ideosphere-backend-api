import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  statusCode?: number;

  constructor(message: string = 'Something went wrong try again later', statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message),
    this.statusCode = statusCode;
  }
}

export default CustomAPIError