import mongoose from "mongoose";


const FavoriteBeverage = new mongoose.Schema({
  beverage_id: String,
  beverage_type: {
    type: String,
    enum: ['beer', 'cocktail'],
    default: 'beer'
  },
  bar: {
    type: String,
    enum: ['dkm', 'mkm'],
    default: 'dkm'
  }
})

export interface FavoriteBeverage {
  beverage_id: String,
  beverage_type: String,
  bar: String
}

export interface User extends mongoose.Document {
  username: String;
  password: String;
  credentials: String;
  favorites: FavoriteBeverage[];
}

export interface OrderDetail {
  beverage: String;
  quantity: Number;
  id: String;
}

export interface Order extends mongoose.Document {
  user: mongoose.Types.ObjectId | String;
  order: Array<OrderDetail>;
  made: Boolean;
  paid: Boolean;
  timeMade: String;
  timePaid: String;
  bar: String;
  date: String;
}

export interface Beer extends mongoose.Document {
  name: String;
  active: Boolean;
  price: Number;
  percentage: Number;
  description: String;
}

export interface Cocktail extends mongoose.Document {
  name: String;
  active: Boolean;
  price: Number;
  ingredients: String[];
  description: String;
  alcoholVolume: Number;
}
