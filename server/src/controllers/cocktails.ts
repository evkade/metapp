import { CocktailModelDKM, CocktailModelMKM } from '../models/cocktailSchema';
import { Cocktail } from '../models/interfaces'

export async function getActiveCocktails(currentBar: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    // @ts-ignore
    const data = await model.find({ active: true }, '', (err, cocktails) => {
        if (err) throw new Error("error")
        else return cocktails
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return data;
}

export async function getCocktails(currentBar: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    // @ts-ignore
    const data = await model.find({}, '', (err, cocktails) => {
        if (err) throw new Error("error")
        else return cocktails
        //@ts-ignore
    }).clone().catch(function (err) { console.log(err) })

    return data;
}

export async function getCocktailById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;
    //@ts-ignore
    const data = await model.find({ _id: id }, '', (err, cocktails) => {
        if (err) throw new Error("error")
        else return cocktails
        //@ts-ignore
    }).clone().catch(function (err: Error) { throw new Error(err.stack) })

    return data;
}

export async function deleteCocktailById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;
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

export async function upsertCocktail(currentBar: String, cocktail: Cocktail): Promise<Cocktail> {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    //@ts-ignore
    let upsertedCocktail = await model.findOneAndUpdate({ name: cocktail.name }, cocktail, { upsert: true, new: true }, function (err, cocktail) {
        if (err) throw new Error("error")
        else {
            return cocktail
        }
        //@ts-ignore
    }).clone().catch(function (err) { throw new Error("Error") })
    return upsertedCocktail;


}
