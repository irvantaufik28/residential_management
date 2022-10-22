const express = require("express");
const router = express.Router();

const home = require("../controller/home");

// HOME 
router.get("/admin/home/:id",home.gethomeById)
router.get("/admin/home/all/:id",home.getAllhome)
router.get("/admin/home/user/:id",home.gethomeByUserId)
router.post("/admin/home/create",home.createHome)
router.put("/admin/home/update/:id",home.updateHomeByAdmin)


module.exports = router;
