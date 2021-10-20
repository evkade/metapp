import jwt from "jsonwebtoken";
import { User } from "../models/interfaces";
import { getUserByUsername, getUsers } from "../controllers/users";

export default class AuthService {
  public static async signIn(
    username: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const existinguser: User | undefined = await getUserByUsername(username);

    //console.log(existinguser)
    //console.log("password must be implemented",password)

    const user = existinguser ? existinguser : undefined;

    //console.log(user)

    if (user === undefined) {
      throw new Error("user not exist");
    }
    // generate JWT
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        isAdmin: user.credentials === "admin",
      },
      process.env.JWT_KEY!, // secret jwt key to sign and verify
      {
        expiresIn: "15d",
      }
    );

    return { user, token };
  }
}
