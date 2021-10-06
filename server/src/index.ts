import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { beerRouter } from './routes/beers';

const bp = require('body-parser');
const app = express();

dotenv.config({ path: './src/config.env' });
const Port = process.env.PORT || 6000;

// Cors policy: Allows localhost:8080 which is client port
var allowedOrigins = ['http://localhost:8080'];

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors(options));
app.use(beerRouter);

app.get('/', (req, res) => {
  console.log('recieved request');
  res.send('Express + TypeScript Server');
});

app.listen(Port, () => {
  console.log(
    `⚡️[server]: Server is running in ${process.env.NODE_ENV} at https://localhost:${Port}`
  );
});
