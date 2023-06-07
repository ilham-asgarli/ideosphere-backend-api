import BaseResponse from './base.response';

class ErrorResponse extends BaseResponse {
  message: string;
  code?: string;
  data?: any;

  constructor({ message, code, data }: { message: string; code?: string; data?: any }) {
    super({ status: 'error' });
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

export default ErrorResponse;
