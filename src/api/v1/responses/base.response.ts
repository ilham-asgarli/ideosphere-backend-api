class BaseResponse {
    status: string;

    constructor({ status }: { status: string }) {
        this.status = status;
    }
}

export default BaseResponse;
