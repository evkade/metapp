import mongoose, { Schema } from 'mongoose';
import { favoriteRouter } from 'routes/favorites';
import { BeerModelDKM, BeerModelMKM } from '../models/beerSchema';
import { CocktailModelDKM, CocktailModelMKM } from '../models/cocktailSchema';
import { Beer, Cocktail } from '../models/interfaces'
import { UserModel } from '../models/userSchema'

interface elementType {
    beverage: Beer | Cocktail;
    bar: String,
    beverage_type: String

}

export async function getfavorites(userid: String) {
    let person = await UserModel.findOne({ _id: userid }).populate({ path: 'favorites.logId', select: '-__v ' });
    if (person !== null) {
        const elem: Array<elementType> = person.favorites.map((element: any) => {
            return ({
                "beverage": element.logId,
                "bar": element.logType.substring(0, 3).toLowerCase(),
                "beverage_type": element.logType.substring(4, element.logType.length).toLowerCase(),
            })
        })
        const returnValue = {
            beer: elem.filter(data => data.beverage_type === "beer"),
            cocktail: elem.filter(data => data.beverage_type === "cocktail")
        }
        return returnValue
    }
    else {
        return null;
    }
}

export async function getfavoritesByPub(userid: String, pub: String) {
    let person = await UserModel.findOne({ _id: userid }).populate({ path: 'favorites.logId', select: '-__v -_id' });
    if (person !== null) {

        const elem: Array<elementType> = person.favorites.map((element: any) => {
            return ({
                "beverage": element.logId,
                "bar": element.logType.substring(0, 3).toLowerCase(),
                "beverage_type": element.logType.substring(4, element.logType.length).toLowerCase(),
            })

        }).filter(data => data.bar === pub)
        return elem
    }
    else {
        return null;
    }
}

export async function addFavoriteById(userid: String, object: { logId: Schema.Types.ObjectId, beverage_type: String, bar: String }) {

    let modela = ""
    if (object.beverage_type === "beer") {
        modela = (object.bar === "dkm") ? "dkm_Beer" : "mkm_Beer";
    }
    else {
        modela = (object.bar === "dkm") ? "dkm_Cocktail" : "mkm_Cocktail";
    }

    if (!(await checkInDB(object.logId, object.bar, object.beverage_type))) {
        return undefined
    }
    else if (await checkExist(userid, object.logId)) {
        return null
    }
    else {

        const insertFavorite = {
            logId: object.logId,
            logType: modela
        }
        let userDoc = await UserModel.findOneAndUpdate({ _id: userid }, { $addToSet: { 'favorites': insertFavorite } }, { new: true })
            .catch(err => { throw err });

        return userDoc;
    }

}

export async function checkExist(userid: String, beverage_id: Schema.Types.ObjectId) {
    let userDoc = await UserModel.findOne({ _id: userid }).then(data => { return data?.favorites })
    let bool: Boolean = false;
    if (userDoc) {
        bool = await userDoc?.some((element: any) => element.logId.toString() === beverage_id)
    }
    else {
        return false
    }
    return bool
}

export async function checkInDB(beverage_id: Schema.Types.ObjectId, bar: String, type: String) {
    let model: typeof CocktailModelDKM | typeof CocktailModelMKM | typeof BeerModelDKM | typeof BeerModelMKM
    switch (type) {
        case "cocktail":
            model = (bar === "dkm") ? CocktailModelDKM : CocktailModelMKM;
            break;
        default:
            model = (bar === "dkm") ? BeerModelDKM : BeerModelMKM;
            break;
    }
    const bool = await model.findById(beverage_id).count().exec();
    return bool;
}


export async function deleteFavoriteById(userid: String, object: { logId: Schema.Types.ObjectId, beverage_type: String, bar: String }) {
    let beverageModel: String = ""
    if (object.beverage_type === "beer") {
        beverageModel = (object.bar === "dkm") ? "dkm_Beer" : "mkm_Beer";
    }
    else {
        beverageModel = (object.bar === "dkm") ? "dkm_Cocktail" : "mkm_Cocktail";
    }

    if (!(await checkExist(userid, object.logId))) {
        return null
    }
    const deleteFavorite = {
        logId: object.logId,
        logType: beverageModel
    }
    let userDoc = UserModel.findOneAndUpdate({ _id: userid }, { $pull: { 'favorites': deleteFavorite } }, { new: true });

    return userDoc
}