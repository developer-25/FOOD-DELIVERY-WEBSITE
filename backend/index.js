const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))


const port = process.env.PORT|| 5000;
const mongoDB=require("./db")

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",`${process.env.BASE_URL}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  )
  next();
})
mongoDB();
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})
