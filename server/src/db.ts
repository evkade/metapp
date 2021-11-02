import mongoose, { ConnectOptions } from "mongoose";

const mongoURI =
  "mongodb+srv://metapp:metapp123@metapp.3yd8e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  const conn = await mongoose.connect(mongoURI, {} as ConnectOptions);
};

export default connectDB;
