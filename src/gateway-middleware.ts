import JWT from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

interface IPayload {
  id: TOKEN;
  iat: number;
}

enum TOKEN {
  AUTH = 'auth',
  SELLER = 'seller',
  GIG = 'gig',
  SEARCH = 'search',
  BUYER = 'buyer',
  MESSAGE = 'message',
  ORDER = 'order',
  REVIEW = 'review',
}

export function verifyGatewayRequest(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.headers?.gatewayToken) {
    throw new NotAuthorizedError(
      'Invalid Request',
      'verifyGatewayRequest() method: Request not coming from API gateway'
    );
  }

  const token: string = req.headers?.gatewayToken as string;
  if (!token) {
    throw new NotAuthorizedError(
      'Invalid Request',
      'verifyGatewayRequest() method: Request not coming from API gateway'
    );
  }

  try {
    const payload: IPayload = JWT.verify(token, '') as IPayload;
    if (!Object.values(TOKEN).includes(payload.id)) {
      throw new NotAuthorizedError(
        'Invalid Request',
        'verifyGatewayRequest() method: Request not coming from API gateway'
      );
    }

    next();
  } catch (error) {
    throw new NotAuthorizedError(
      'Invalid Request',
      'verifyGatewayRequest() method: Request not coming from API gateway'
    );
  }
}
