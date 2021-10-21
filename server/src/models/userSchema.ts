import mongoose from "mongoose";
import { User } from "./interfaces";
import bcrypt from "bcrypt";

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

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

export const UserModel = mongoose.model<User>("User", UserSchema);
