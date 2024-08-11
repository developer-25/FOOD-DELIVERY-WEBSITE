const express = require('express')

require('dotenv').config()
const app = express()

const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGIN || "https://goeatfood.netlify.app/login"||"https://goeatfood.netlify.app/CreateUser";

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you're using cookies
}));


const PORT = process.env.PORT|| 5000;
const mongoDB=require("./db")


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",`${allowedOrigins}`);
  res.header
  (
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



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
