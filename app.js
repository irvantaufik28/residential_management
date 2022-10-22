// We can use express as shown as below
const express = require("express");
const app = express();
const http = require("http");

// lib
const bcrypt = require("bcrypt")
const generateAccessToken = require("./helper/jwt")
const serverError = require("./middleware/serverError")
const _ = require("lodash")
const func = require('./libs/function')
const email_message = require("./internal/constant/email_message")


// import repository
const UserRepository = require('./repository/user')
const AuthRepository = require('./repository/auth')
const OtpRepository = require('./repository/otp')
const EmailRepository = require('./repository/email')
const HomeRepository = require('./repository/home')

// import Usecase
const AuthUseCase = require('./usecase/auth')
const UserUseCase = require('./usecase/user')
const OtpUseCase = require('./usecase/otp')
const HomeUseCase = require('./usecase/home')


// intit router
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const memberRouter = require("./routes/member");
const publicRouter = require("./routes/public");

// init
const authUC = new AuthUseCase(
  new AuthRepository(),
  new UserRepository(),
  new EmailRepository(),
  bcrypt,
  generateAccessToken,
  _
)
const userUC = new UserUseCase(
  new UserRepository(),
  new OtpRepository(),
  bcrypt,
);


const otpUC = new OtpUseCase(
  new OtpRepository(),
  new EmailRepository(),
  email_message
);

const homeUC = new HomeUseCase(
  new HomeRepository(),
  new UserRepository(),
  _
)

app.use((req, res, next) => {
  req.authUC = authUC;
  req.otpUC = otpUC;
  req.userUC = userUC;
  req.homeUC = homeUC;
  next();
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello Web Pengelolahan Perum');
});

app.use("/api", authRouter);
app.use("/api", adminRouter);
app.use("/api", memberRouter);
app.use("/api", publicRouter);


app.use(serverError);
const httpServer = http.createServer(app);

module.exports = httpServer;
