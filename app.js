// We can use express as shown as below
const express = require('express')
const app = express()
const http = require("http");

// lib
const bcrypt = require("bcrypt")
const generateAccessToken = require("./helper/jwt")
const serverError = require("./middleware/serverError")
const _ = require("lodash")


// import repository
const UserRepository = require('./repository/user')
const AuthRepository = require('./repository/auth')


// import Usecase
const AuthUseCase = require('./usecase/auth')


// intit router
const authRouter = require("./routes/auth");

// init 
const authUC = new AuthUseCase(
  new AuthRepository(),
  new UserRepository(),
  bcrypt,
  generateAccessToken,
  _
)


app.use((req, res, next) => {
  req.authUC = authUC;
  next();
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello Web Pengelolahan Perum');
});

app.use("/", authRouter);


app.use(serverError);
const httpServer = http.createServer(app);

module.exports = httpServer;