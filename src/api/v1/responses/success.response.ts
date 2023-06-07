import BaseResponse from './base.response';

class SuccessResponse extends BaseResponse {
  data: any;

  constructor({ data }: { data: any }) {
    super({ status: 'success' });
    this.data = data;
  }
}

export default SuccessResponse;
