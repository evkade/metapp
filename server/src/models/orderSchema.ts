import mongoose from "mongoose";
import { Order } from "./interfaces";

const OrderSchema = new mongoose.Schema({
  beverage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
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
