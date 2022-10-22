const express = require("express");
const router = express.Router();

const auth = require("../controller/auth");
const oauth = require("../controller/oauth");

router.post("/user/login", auth.login);
router.post("/user/register", auth.register);

router.get("/login/google", oauth.loginWithGooglePage);
router.post("/login/google", oauth.loginWithGoogle);

module.exports = router;
