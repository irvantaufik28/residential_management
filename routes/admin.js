const express = require("express");
const router = express.Router();

const home = require("../controller/home");
const user = require("../controller/user");

// HOME
router.get("/admin/home/:id", home.gethomeById);
router.get("/admin/all-home", home.getAllHome);
router.get("/admin/home-member/", home.gethomeByUserId);
router.post("/admin/home/create", home.createHome);
router.put("/admin/home-update/:id", home.updateHomeByAdmin);
router.delete("/admin/home-delete/:id", home.deletehome);

// USER
router.put("/admin/update/member/:id", user.updateMemberByAdmin )

module.exports = router;
