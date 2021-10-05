import mongoose from "mongoose";
import { User } from './interfaces';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
    maxlength: [50, "Username can not more than 50 characters"],
  },
  password: {
    type: String,
    required: true,
    maxlength: 50,
  },
  credentials: String,
  email: {
    type: String,
    match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Please use a valid email"],
  },
});

export const UserModel = mongoose.model<User>("User", UserSchema);
