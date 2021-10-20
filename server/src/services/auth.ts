import { findUser, verifyPassword } from "../controllers/users";
import jwt from "jsonwebtoken";
import { User } from "../models/interfaces";

export default class AuthService {
  public static async signIn(
    username: string,
    password: string
  ): Promise<{ user: User | null; token: string }> {
    //@ts-ignore
    let user: User | null = await findUser(username).catch((err) => { throw new Error("user not exist") })
    let token = ""
    if (user !== null) {
      try {
        const bool = await verifyPassword(username, password)
        if (bool === true) {
          // generate JWT
          token = jwt.sign(
            {
              username: user.username,
              email: user.email,
              isAdmin: user.credentials === 'admin'
            },
            process.env.JWT_KEY!, // secret jwt key to sign and verify
            {
              expiresIn: "15d"
            }
          );
        }
        else {
          user = null;
        }
      } catch (error) {
        throw new Error("wrong credentials")
      }
    }

    return { user, token };
  }
}
