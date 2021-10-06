import mongoose from 'mongoose';

export interface User extends mongoose.Document {
    username: String;
    password: String;
    credentials: String;
    email: String;
}
