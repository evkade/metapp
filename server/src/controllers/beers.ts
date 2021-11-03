import { BeerModelDKM, BeerModelMKM } from '../models/beerSchema';
import { Beer } from '../models/interfaces'

export async function getActiveBeers(currentBar: String) {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;

    try {
        const data = await model.find({ active: true }).exec().catch(err => { throw err })
        return data;
    } catch (error) {
        throw error
    }
}

export async function getBeers(currentBar: String) {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;

    try {
        const data = await model.find({}).exec().catch(err => { throw err });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getBeerById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;
    try {
        const data = await model.find({ _id: id }).exec()
            .catch(err => { throw err })
        return data;
    } catch (error) {
        throw error
    }
}

export async function deleteBeerById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;

    try {
        const data = await model.deleteOne({ _id: id }).exec()
            .catch(err => { throw err })

        return data;
    } catch (error) {
        throw error
    }
}

export async function upsertBeer(currentBar: String, beer: Beer): Promise<Beer> {

    const model = (currentBar === "dkm") ? BeerModelDKM : BeerModelMKM;

    try {
        const upsertedBeer = await model.findOneAndUpdate({ name: beer.name }, beer, { upsert: true, new: true }).exec()
            .catch(err => { throw err })
        return upsertedBeer;
    } catch (error) {
        throw error
    }

}
