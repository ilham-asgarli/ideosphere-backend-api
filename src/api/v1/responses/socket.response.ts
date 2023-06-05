import BaseResponse from "./base.response";

class SocketResponse {
    name: string;
    data: any;

    constructor({ name, data }: { name:string ,data: any }) {
        this.name = name;
        this.data = data;
    }
}

export default SocketResponse;
