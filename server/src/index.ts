import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";

import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth";
import { apiBeerRouter } from "./routes/apibeers";
import { beerRouter } from "./routes/beers";
import { cocktailRouter } from "./routes/cocktail";
import { userRouter } from "./routes/user";
import { menuRouter } from "./routes/menu";
import { orderRouter } from "./routes/orders";
import { favoriteRouter } from "./routes/favorites"
import { errorHandler } from './services/error-handler/errorHandler';

const socket = require("socket.io");
const bp = require("body-parser");
const app = express();

// Handles post requests
app.use(express.json());

dotenv.config({ path: "./src/config.env" });
dotenv.config({ path: "./src/secret.config.env" });

const Port = process.env.PORT || 6000;

const db = connectDB();

// Cors policy: Allows localhost:8080 which is client port
var allowedOrigins = ["http://localhost:8080"];

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(
  cookieSession({
    name: "auth_token",
    signed: false,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })
);

app.use(cookieParser());

app.use(cors(options));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(userRouter);
app.use(beerRouter);
app.use(cocktailRouter);
app.use(apiBeerRouter);
app.use(authRouter);
app.use(orderRouter);
app.use(menuRouter);
app.use(favoriteRouter);

app.get("/", (req, res) => {
  console.log("received request");
  res.send("Express + TypeScript Server");
});

app.use(errorHandler)
const server = app.listen(Port, () => {
  console.log(
    `⚡️[server]: Server is running in ${process.env.NODE_ENV} at https://localhost:${Port}`
  );
});

export const io = socket(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("orderPlaced", (order: any) => {
    io.sockets.emit("orderPlaced", order);
  });

  socket.on("made", (data: any) => {
    io.sockets.emit("made", data);
  });

  socket.on("paid", (data: any) => {
    io.sockets.emit("paid", data);
  });
});
