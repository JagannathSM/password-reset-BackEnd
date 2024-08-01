const express = require("express");
const cors= require("cors");
require("dotenv").config();
require("./DB/ConnectMongoDB");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/authRoute")
const userRoutes = require("./Routes/userRoute");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT,()=>{
    console.log(`Server Running on Port - ${PORT}`)
}) 