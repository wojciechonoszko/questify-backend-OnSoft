const express = require("express");
const router = express.Router();
const ctrlUser = require("../controller");
const authMiddleware = require("../middlewares/jwt");

router.post("/register", ctrlUser.register);
router.post("/login", ctrlUser.login);
router.post("/logout", authMiddleware, ctrlUser.logout);

module.exports = router;