import { favoriteRouter } from 'routes/favorites';
import { BeerModelDKM, BeerModelMKM } from '../models/beerSchema';
import { Beer, FavoriteBeverage } from '../models/interfaces'
import { UserModel } from '../models/userSchema'


export async function getfavorites(userid: String) {

    //const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;

    // @ts-ignore
    const data = await UserModel.find({ _id: userid }, '', (err, beers) => {
        if (err) return err

        console.log("er+ " + beers)
        return beers
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return data;
}


export async function getBeerById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;
    //@ts-ignore
    const data = await model.find({ _id: id }, '', (err, beers) => {
        if (err) return err
        else return beers
        //@ts-ignore
    }).clone().catch(function (err: Error) { console.log(err) })

    return data;
}

export async function deleteBeerById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;
    //@ts-ignore
    const data = await model.deleteOne({ _id: id }, function (err) {
        if (err) return err
        //@ts-ignore
    }).clone().catch(function (err: Error) { console.log(err) })

    return data;
}

export async function addFavoriteById(userid: String, object: FavoriteBeverage) {

    console.log("afbid " + userid)
    console.log("afbid " + object.bar + object.beverage_id + object.beverage_type);
    //@ts-ignore
    //let userDoc = await UserModel.findById(userid);
    let userDoc = UserModel.findOneAndUpdate({ _id: userid }, { $push: { favorites: object } });


    return userDoc;

}



export async function upsertBeer(currentBar: String, beer: Beer): Promise<Beer> {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;

    //@ts-ignore
    let upsertedBeer = await model.findOneAndUpdate({ name: beer.name }, beer, { upsert: true, new: true }, function (err, doc) {
        if (err) return err
        else {
            return doc
        }
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return upsertedBeer;


}

