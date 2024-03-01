const express = require('express');
// Import API's router
const userApi = require("./APIs/user-api");
const bookApi = require("./APIs/book-api");
const orderApi = require("./APIs/order-api");

const connectDB = require('./config/db');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

// Connect to database
connectDB();


//Connect to React App
const path = require("path");
const cors = require("cors");

app.use(express.static(path.join(__dirname,'../client/build')))

// app.use((req,res,next)=>{
//   res.sendFile(path.join(__dirname,'../client/build/index.html'));
// })

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// Use the userApi router
app.use("/user-api", userApi);
app.use("/book-api", bookApi);
app.use("/order-api", orderApi);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
