import { UserModel } from '../models/userSchema';
import { User } from '../models/interfaces'

export async function getUsers() {

    // @ts-ignore
    const data = await UserModel.find({}, 'username credentials', (err, users) => {
        if (err) throw new Error("")
        else return users
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return data;
}


export async function findUser(username: string): Promise<User | null> {
    console.log("findUser")
    try {
        // @ts-ignore
        const userPromise: User = await UserModel.findOne({ username: username }, (err, userDoc) => {
            if (err) console.log(err)
            else return userDoc
            //@ts-ignore
        }).clone()

        if (userPromise) {
            console.log("users,  userpromise")
            return userPromise
        }
        else {
            console.log("users, no userpromise")
            return null
        }

    } catch (err) {
        throw new Error("error")
    }


}

export async function addUser(user: User): Promise<User | null> {


    try {
        // @ts-ignore
        const userPromise: User = await findUser((user.username) as string).catch((err) => { throw new Error() })

        console.log(userPromise)
        if (userPromise === null) {
            console.log("entered if")
            const insertedUser = await new UserModel(user);
            console.log(insertedUser)
            insertedUser.save();
            return insertedUser;
        } else {
            return null
        }
    } catch (err) {
        throw new Error("error")
    }

}


