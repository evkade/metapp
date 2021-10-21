import { UserModel } from "../models/userSchema";
import { User } from "../models/interfaces";
import bcrypt from "bcrypt";

export async function getUsers() {

    // @ts-ignore
    const data = await UserModel.find({}, 'username credentials', (err, users) => {
        if (err) return err
        else return users
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return data;
}

export async function findUser(username: string): Promise<User | null> {
    try {
        // @ts-ignore
        const userPromise: User = await UserModel.findOne(
            { username: username },
            (err: Error, userDoc: any) => {
                if (err) console.log(err);
                else return userDoc;
            } //@ts-ignore
        ).clone();

        if (userPromise !== null) {
            return userPromise;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err)
        return null;
    }
}


export async function verifyPassword(username: string, password: string): Promise<Boolean | null> {
    // @ts-ignore
    const userPromise: User = await UserModel.findOne({ username: username }, (err, userDoc) => {
        if (err) return err
        return userDoc
        //@ts-ignore
    }).clone().catch(() => { throw new Error("error") })
    const isMatch = await bcrypt.compare(
        password,
        userPromise.password as string
    );
    return isMatch;
}

export async function addUser(user: User): Promise<User | null> {
    try {
        // @ts-ignore
        const userPromise: User = await findUser(user.username as string).catch(
            (err) => {
                return err
            }
        );
        console.log("AU", user)
        if (userPromise === null) {
            const insertedUser = await new UserModel({
                ...user,
                credentials: "user",
                email: "test@gmail.com"
            });
            console.log(insertedUser)
            insertedUser.save();
            return insertedUser;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err)
        return null;
    }
}
