import mongoose from "mongoose";
import { User } from "./interfaces";
import bcrypt from "bcrypt";

enum Pubs {
  dkm = 'dkm',
  mkm = 'mkm'
}

enum Roles {
  user = 'user',
  admin = 'admin'
}

enum BeverageTypes {
  Beer = "beer",
  Cocktail = "cocktail"
}

const FavoriteBeverage = new mongoose.Schema({
  beverage_id: String,
  beverage_type: {
    type: String,
    enum: BeverageTypes
  },
  bar: {
    type: String,
    enum: Pubs
  }
})

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
  credentials: {
    type: String,
    enum: Roles,
    default: Roles.user
  },
  favorites: {
    type: [FavoriteBeverage]
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
