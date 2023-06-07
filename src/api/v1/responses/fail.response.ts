import BaseResponse from './base.response';

class FailResponse extends BaseResponse {
  data: any;

  constructor({ data }: { data: any }) {
    super({ status: 'fail' });
    this.data = data;
  }
}

export default FailResponse;
