import mongoose, { Schema } from "mongoose";
import { Order } from "./interfaces";
import { UserModel } from "./userSchema";

const OrderDetailSchema = new mongoose.Schema({
  beverage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  order: {
    type: [OrderDetailSchema],
    required: true,
  },
  made: Boolean,
  paid: Boolean,
  timeMade: String,
  timePaid: String,
  bar: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
