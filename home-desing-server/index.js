const chalk = import("chalk").then(m=>m.default);
async function main2(){
    const _chalk = await chalk;
    console.log(_chalk.bgMagenta("hello welcome to our project"));
  }
  main2()

const express = require("express");
require ("dotenv").config();
const mongoose = require("mongoose");
const login = require("./routes/login");
const register = require("./routes/register");
const products = require("./routes/products");
const users = require("./routes/users");
const carts = require("./routes/carts");
const cors = require("cors");


const app = express();
const port = process.env.PORT || 3000;

mongoose
 .connect(process.env.DB, {useNewUrlParser: true})
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.log(err))


app.use(express.json());
app.use(cors());
app.use("/api/login" , login);
app.use("/api/register" , register);
app.use("/api/products" , products);
app.use("/api/users" , users);
app.use("/api/carts" , carts);

app.listen(port, () => console.log("Server started on port" ,port))