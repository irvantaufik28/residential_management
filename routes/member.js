const express = require("express");
const router = express.Router();

const home = require("../controller/home");

// HOME 
router.put("/member/home/update/",home.updateHomeByMember)


module.exports = router;
