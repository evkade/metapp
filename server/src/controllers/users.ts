import { UserModel } from '../models/userSchema';
import { User } from '../models/interfaces'
import bcrypt from 'bcrypt'

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
        const userPromise: User = await UserModel.findOne({ username: username }, (err, userDoc) => {
            if (err) console.log(err)
            else return userDoc
            //@ts-ignore
        }).clone()

        if (userPromise !== null) {
            return userPromise
        }
        else {
            return null
        }

    } catch (err) {
        throw new Error("error")
    }
}

export async function verifyPassword(username: string, password: string): Promise<Boolean | null> {
    // @ts-ignore
    const userPromise: User = await UserModel.findOne({ username: username }, (err, userDoc) => {
        if (err) return err
        return userDoc
        //@ts-ignore
    }).clone().catch(() => { throw new Error("error") })

    const isMatch = await bcrypt.compare(password, (userPromise.password) as string)
    return isMatch;
}

export async function addUser(user: User): Promise<User | null> {
    try {
        // @ts-ignore
        const userPromise: User = await findUser((user.username) as string).catch((err) => { throw new Error() })
        if (userPromise === null) {
            const insertedUser = await new UserModel(user);
            insertedUser.save();
            return insertedUser;
        } else {
            return null
        }
    } catch (err) {
        throw new Error("error")
    }

}


