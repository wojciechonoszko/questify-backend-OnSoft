const express = require("express");
const authMiddleware = require("../middlewares/jwt");
const router = express.Router();
const authRouter = require("./auth");
const itemsRouter = require("./items");

router.use("/auth", authRouter);
router.use("/items", authMiddleware, itemsRouter);

module.exports = router;