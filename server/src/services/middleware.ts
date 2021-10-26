import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { ErrorCode } from "./error-handler/errorCode";
import { ErrorException } from "./error-handler/errorException";

export interface UserPayload {
  id: string;
  isAdmin: boolean;
}

// currentUser to the req object
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const isSignedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as any;
    req.currentUser = payload;
  } catch (err) { next(new ErrorException(ErrorCode.Unauthenticated)) }

  next();
};
