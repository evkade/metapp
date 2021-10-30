import mongoose from "mongoose";
import { FavoriteBeverage } from "./favoriteSchema";


export interface User extends mongoose.Document {
  username: String;
  password: String;
  credentials: String;
  favorites: Array<typeof FavoriteBeverage>;
}

export interface OrderDetail {
  beverage: String;
  quantity: Number;
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
  cancelled: Boolean;
}

export interface Beer extends mongoose.Document {
  name: String;
  active: Boolean;
  price: Number;
  percentage: Number;
  volume: Number;
  beerType: String;
}

export interface Cocktail extends mongoose.Document {
  name: String;
  active: Boolean;
  price: Number;
  ingredients: String[];
  description: String;
  alcoholVolume: Number;
}
