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
