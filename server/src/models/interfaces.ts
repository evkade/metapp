import mongoose from "mongoose";

export interface User extends mongoose.Document {
  username: String;
  password: String;
  credentials: String;
  email: String;
}

export interface Order extends mongoose.Document {
  beverage: String;
  quantity: Number;
  user: String;
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
    alcoholVolume: Number,

}