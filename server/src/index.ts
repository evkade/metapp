import express from 'express'
import dotenv from 'dotenv'
// rest of the code remains same
const app = express()


dotenv.config({path: './src/config.env'})

const Port = process.env.PORT || 6000


app.get('/', (req, res) => res.send('Express + TypeScript Server'))
app.listen(Port, () => {
  console.log(`⚡️[server]: Server is running in ${process.env.NODE_ENV} at https://localhost:${Port}`)
});