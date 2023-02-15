const express = require("express");
const router = express.Router();
const ctrlItems = require("../controller");


router.get("/", ctrlItems.getQuests);
router.post("/", ctrlItems.addQuest);
router.patch("/", ctrlItems.updateQuest)
router.delete("/",ctrlItems.deleteQuest)


module.exports = router;