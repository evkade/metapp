import { UserModel } from '../models/userSchema';
import {User } from '../models/interfaces'

export async function getUsers() {

    // @ts-ignore
   const data= await UserModel.find({}, 'username credentials', (err, users) => {
        if(err) throw new Error("")
        else return users
        //@ts-ignore
    }).clone().catch(function(err){ console.log(err)})

    return data;
}

export async function getUserByUsername(username : string) :Promise<User>
{

    // @ts-ignore
    const user: User = await UserModel.findOne({username:username}).clone().catch(function(err){ console.log(err)})
    return user
}

export async function addUser(user:User) : Promise<User>{
    console.log("entered addUser")
    // @ts-ignore
    
    if(!getUserByUsername(user.username)){
    const insertedUser = await new UserModel(user);
    insertedUser.save();
    return insertedUser;
    }else{
        throw new Error()
    }

}


