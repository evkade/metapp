import { findUser, verifyPassword } from "../controllers/users";
import jwt from "jsonwebtoken";
import { User } from "../models/interfaces";
import { ErrorException } from "./error-handler/errorException";
import { ErrorCode } from "./error-handler/errorCode";

export default class AuthService {
  public static async logIn(
    username: string,
    password: string
  ): Promise<{ user: User | null | undefined; token: string }> {
    //@ts-ignore
    let user: User | null | undefined = await findUser(username);
    let token = "";
    if (user !== null && user !== undefined) {
      try {
        const bool = await verifyPassword(username, password);
        if (bool === true) {
          // generate JWT
          token = jwt.sign(
            {
              _id: user._id,
              username: user.username,
              isAdmin: user.credentials === "admin",
            },
            process.env.JWT_KEY!, // secret jwt key to sign and verify
            {
              expiresIn: "15d",
            }
          );

        } else {
          user = undefined;
        }
      } catch (error) {
        Promise.reject(new ErrorException(ErrorCode.WrongCredentials));
      }
    }

    return { user, token };
  }
}
