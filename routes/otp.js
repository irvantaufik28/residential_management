const express = require("express");
const router = express.Router();

const otp = require("../controller/otp");


router.post("/request/otp", otp.generateOTP);
router.post("/verify/otp", otp.verifyOTP);


module.exports = router;
