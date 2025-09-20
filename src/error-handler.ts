import { StatusCodes } from 'http-status-codes';

export interface IErrorResponse extends IError {
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export interface ErrnoException extends Error {
  errorNo?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  public comingFrom: string;
  public message: string;

  constructor(message: string, comingFrom: string) {
    super();
    this.comingFrom = comingFrom;
    this.message = message;
  }

  public serializeErrors(): IError {
    return {
      message: this.message,
      comingFrom: this.comingFrom,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode: number = StatusCodes.BAD_REQUEST;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode: number = StatusCodes.NOT_FOUND;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode: number = StatusCodes.UNAUTHORIZED;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode: number = StatusCodes.REQUEST_TOO_LONG;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode: number = StatusCodes.SERVICE_UNAVAILABLE;
  status: string = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
