import { CocktailModelDKM, CocktailModelMKM } from '../models/cocktailSchema';
import { Cocktail } from '../models/interfaces'

export async function getActiveCocktails(currentBar: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    try {
        const data = await model.find({ active: true }).exec().catch(err => { throw err })
        return data;
    } catch (error) {
        throw error
    }
}

export async function getCocktails(currentBar: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    try {
        const data = await model.find({}).exec().catch(err => { throw err });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getCocktailById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    try {
        const data = await model.find({ _id: id }).exec().catch(err => { throw err })
        return data;
    } catch (error) {
        throw error
    }
}

export async function deleteCocktailById(currentBar: String, id: String) {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    try {
        const data = await model.deleteOne({ _id: id }).exec()
            .catch(err => { throw err })

        return data;
    } catch (error) {
        throw error
    }

}

export async function upsertCocktail(currentBar: String, cocktail: Cocktail): Promise<Cocktail> {

    const model = (currentBar === "dkm") ? CocktailModelDKM : CocktailModelMKM;

    try {
        const upsertedCocktail = await model.findOneAndUpdate({ name: cocktail.name }, cocktail, { upsert: true, new: true }).exec()
            .catch(err => { throw err })
        return upsertedCocktail;
    } catch (error) {
        throw error
    }

}

