import mongoose, { Schema } from "mongoose";


export const FavoriteBeverage = new mongoose.Schema({

    logId: {
        type: Schema.Types.ObjectId,
        unique: true,
        refPath: 'favorites.logType'
    },
    logType: {
        type: String,
        required: true,
        enum: ['dkm_Cocktail', 'mkm_Cocktail', 'dkm_Beer', 'mkm_Beer']
    }

})