import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
​
interface UserPayload {
    id: string;
    email: string;
    isAdmin: boolean;
  }
  ​
  // currentUser to the req object
  declare global {
    namespace Express {
      interface Request {
        currentUser?: UserPayload;
      }
    }
  }

export const isSignedIn = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      console.log(req.session?.jwt)
    try {
      const payload = jwt.verify(
        req.session?.jwt,
        process.env.JWT_KEY!
      ) as any;
      console.log('payload ', payload)
      req.currentUser = payload;
    } catch (err) {console.log('error')}
  ​
    next();
  };

