import { BeerModelDKM, BeerModelMKM } from '../models/beerSchema';
import { Beer } from '../models/interfaces'


export async function getActiveBeers(currentPub: String) {

    const model = (currentPub === "DKM") ? BeerModelDKM : BeerModelMKM;

    // @ts-ignore
    const data = await model.find({ active: true }, '', (err, beers) => {
        if (err) throw new Error("error")
        else return beers
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return data;
}

export async function getBeers(currentPub: String) {

    const model = (currentPub === "DKM") ? BeerModelDKM : BeerModelMKM;

    // @ts-ignore
    const data = await model.find({}, '', (err, beers) => {
        if (err) throw new Error("error")
        else return beers
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return data;
}

export async function getBeerById(currentPub: String, id: String) {

    const model = (currentPub === "DKM") ? BeerModelDKM : BeerModelMKM;
    //@ts-ignore
    const data = await model.find({ _id: id }, '', (err, beers) => {
        if (err) throw new Error("error")
        else return beers
        //@ts-ignore
    }).clone().catch(function (err: Error) { throw new Error(err.stack) })

    return data;
}

export async function deleteBeerById(currentPub: String, id: String) {

    const model = (currentPub === "DKM") ? BeerModelDKM : BeerModelMKM;
    //@ts-ignore
    const data = await model.deleteOne({ _id: id }, function (err) {
        if (!err) {
            return {}
        }
        else {
            throw new Error("Something Went Wrong")
        }
        //@ts-ignore
    }).clone().catch(function (err: Error) { throw new Error(err.stack) })

    return data;
}

export async function upsertBeer(currentpub: String, beer: Beer): Promise<Beer> {

    const model = (currentpub === "DKM") ? BeerModelDKM : BeerModelMKM;

    //@ts-ignore
    let upsertedBeer = await model.findOneAndUpdate({ name: beer.name }, beer, { upsert: true, new: true }, function (err, doc) {
        if (err) throw new Error("error")
        else {
            return doc
        }
        //@ts-ignore
    }).clone().catch(function (err) { throw new Error("Error") })

    return upsertedBeer;


}

