import express, { Request, Response } from "express";
import { isSignedIn } from "../services/middleware";
import { body } from "express-validator";
import AuthService from "../services/auth";
import { addUser } from "../controllers/users";
import { User } from "../models/interfaces";

const router = express.Router();

router.get("/api/auth/currentuser", isSignedIn, (req, res) => {
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
        throw new Error("wrong Credentials");
      }
    );

    if (user === null || user === undefined) {
      return res.status(400).send("User does not exist");
    } else {
      req.session = {
        jwt: token,
      };

      res.status(200).send(user);
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
  async (req: Request, res: Response) => {
    //@ts-ignore
    const user: User = await addUser(req.body).catch((err) =>
      res.status(401).send("User already exists")
    );
    if (user === null) {
      return res.status(401).send("User already exists");
    }
    res.status(201).send(user);
  }
);

router.post("/api/auth/signout", (req, res) => {
  req.session = null;
  res.send();
});

export { router as authRouter };
