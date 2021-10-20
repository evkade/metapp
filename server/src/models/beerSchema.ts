import mongoose from "mongoose";
import { Beer } from './interfaces';

const BeerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
        unique: true,
        maxlength: [50, "Name can not more than 50 characters"],
    },
    active: {
        type: String,
        required: [true, "Please enter whether the beer is active"],
    },

    price: {
        type: Number,
        required: [true, "Please enter a price"],
    },
    percentage: {
        type: Number,
        required: [true, "Please enter a percentage"],
    },
    description: {
        type: String,
        required: false
    }

});

export const BeerModelDKM = mongoose.model<Beer>("dkm_Beer", BeerSchema);
export const BeerModelMKM = mongoose.model<Beer>("mkm_Beer", BeerSchema);

