import express, { Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import { body } from "express-validator";
import AuthService from "../services/auth";
import { addUser } from "../controllers/users";

import { User } from "../models/interfaces";

const router = express.Router();

router.get("/api/auth/currentuser", isSignedIn, (req, res) => {
  //console.log(req.currentUser);

  if (!req.currentUser) {
    return res.status(400).send("not authorized");
  }

  return res.status(200).send({ currentUser: req.currentUser });
});

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    //@ts-ignore
    const { user, token } = await AuthService.signIn(username, password).catch(
      (error) => {
        req.session = null;
        return res.status(400).send({ error: error });
      }
    );

    req.session = {
      jwt: token,
    };

    user.password = undefined;
    console.log(user);
    res.status(200).send(user);
  }
);

router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    //@ts-ignore
    const user: User = await addUser(req.body).catch(() =>
      res.status(401).send("Error")
    );
    res.status(201).send(user);
  }
);

router.post("/api/auth/signout", (req, res) => {
  req.session = null;
  res.send();
});

export { router as authRouter };
