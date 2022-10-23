const express = require("express");
const router = express.Router();

const home = require("../controller/home");
const user = require("../controller/user")
const authorized = require("../middleware/jwt")
// HOME 
router.put("/member/home/update/",home.updateHomeByMember)

// User
router.get("/member/profile/",authorized.public, user.getProfile)
router.put("/member/update/password/",authorized.public, user.updatePassword)
module.exports = router;
