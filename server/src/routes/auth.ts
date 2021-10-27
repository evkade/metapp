import express, { NextFunction, Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import { body } from "express-validator";
import AuthService from "../services/auth";
import { addUser } from "../controllers/users";
import { User } from "../models/interfaces";
import { ErrorException } from "../services/error-handler/errorException";
import { ErrorCode } from "../services/error-handler/errorCode";

const router = express.Router();

router.get(
  "/api/auth/currentuser",
  isSignedIn,
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }
    return res.status(200).send({ currentUser: req.currentUser });
  }
);

router.post(
  "/api/auth/signin",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    //@ts-ignore
    const { user, token } = await AuthService.signIn(username, password).catch(
      (err) => {
        req.session = null;
        next(err);
      }
    );

    if (user === undefined) {
      next(new ErrorException(ErrorCode.WrongCredentials));
    } else if (user === null) {
      next(new ErrorException(ErrorCode.UserNotFound));
    } else {
      req.session = {
        jwt: token,
      };
      res.status(200).send({
        id: user._id,
        name: user.username,
        credential: user.credentials,
      });
    }
  }
);

router.post(
  "/api/auth/signup",
  [
    body("username").trim().isLength({ min: 3, max: 20 }),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user: User | null = await addUser(req.body).catch((err) => {
      next(err);
    });
    if (user === null) {
      next(new ErrorException(ErrorCode.UserAlreadyExists));
    }
    else {
      res.status(201).send({ id: user._id, name: user.username, Credential: user.credentials });
    }

  }
);

router.post("/api/auth/signout", (req, res) => {
  req.session = null;
  res.sendStatus(200);
});

export { router as authRouter };
