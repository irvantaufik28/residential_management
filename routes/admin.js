const express = require("express");
const router = express.Router();

const home = require("../controller/home");
const user = require("../controller/user");
const identityCard = require("../controller/identityCard")

// HOME
router.get("/admin/home/:id", home.gethomeById);
router.get("/admin/all-home", home.getAllHome);
router.get("/admin/home-member/:id", home.gethomeByUserId);
router.post("/admin/home/create", home.createHome);
router.put("/admin/home-update/:id", home.updateHomeByAdmin);
router.delete("/admin/home-delete/:id", home.deletehome);

// USER
router.put("/admin/update/member/:id", user.updateMemberByAdmin)

// IdentityCard
router.get("/admin/identity/:id", identityCard.getIdentityCardById)
router.get("/admin/identity/user/:id", identityCard.getIdentityCardById)
router.get("/admin/identity/user/card-type/", identityCard.getIdentityCardByCardType)
router.post("/admin/identity/create", identityCard.createIdentityCard)
router.put("/admin/identity/update/:id", identityCard.updateIdentityCard)
module.exports = router;
