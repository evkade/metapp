import mongoose from "mongoose";
import { Cocktail } from './interfaces';

const CocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
        unique: true,
        maxlength: [50, "Cocktail name can not more than 50 characters"],
    },
    active: {
        type: Boolean,
        required: [true, "Please enter whether the cocktail is active"],
    },
    price: {
        type: Number,
        required: [true, "Please enter a price"],
    },
    ingredients: {
        type: [String],
        required: [true, "Please enter atleast one ingredient"],
    },
    alcoholVolume: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }

});

export const CocktailModelDKM = mongoose.model<Cocktail>("dkm_Cocktail", CocktailSchema);
export const CocktailModelMKM = mongoose.model<Cocktail>("mkm_Cocktail", CocktailSchema);

