
import jwt from 'jsonwebtoken';
import { User } from '../models/interfaces'
import { addUser, findUser, getUsers } from '../controllers/users';

export default class AuthService {
  public static async signIn(
    username: string,
    password: string
    //@ts-ignore
  ): Promise<{ user: User | null; token: string }> {

    console.log("entered sign in")
    //@ts-ignore
    const user: User | null = await findUser(username).catch((err) => { throw new Error("user not exist") })
    let token = ""

    console.log("auth", user)

    if (user !== null) {

      try {
        console.log("password must be implemented", password)
      } catch (error) {
        throw new Error("wrong credentials")
      }
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

    return { user, token };
  }
}
