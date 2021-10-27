import { ErrorCode } from './errorCode';

export class ErrorException extends Error {
    public status: number = 0;
    public metaData: any = null;
    constructor(code: string = ErrorCode.UnknownError, metaData: any = null) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.status = 500;
        this.metaData = metaData;
        switch (code) {
            case ErrorCode.Unauthenticated:
                this.status = 401;
                break;
            case ErrorCode.badRequest:
                this.status = 400;
                break;
            case ErrorCode.UserNotFound:
                this.status = 400;
                break;
            case ErrorCode.BeverageAlreadyExists:
                this.status = 400;
                break;
            case ErrorCode.UserAlreadyExists:
                this.status = 400;
                break;
            case ErrorCode.AsyncError:
                this.status = 400;
                break;
            case ErrorCode.BeverageNotFound:
                this.status = 400;
                break;
            case ErrorCode.NotFound:
                this.status = 404;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}