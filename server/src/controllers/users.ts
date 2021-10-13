import { UserModel } from '../models/userSchema';
import {User } from '../models/interfaces'

export async function getUsers() {

    // @ts-ignore
    UserModel.find({}, 'username credentials', (err, users) => {
        if(err) console.log(err)
        else console.log(users)
    })
}

export async function addUser(user:User) {

    // @ts-ignore
    const insertedUser = new UserModel(user);
    insertedUser.save();
}

