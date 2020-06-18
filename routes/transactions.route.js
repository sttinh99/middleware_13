const express = require("express");
var shortid = require("shortid");
var db = require('../db');
var router = express.Router();

var controller = require('../controller/transactions.controller');

router.get("/",controller.index);
router.get("/create",controller.getCreate);
router.post("/create",controller.postCreate);
router.get("/:id/complete",controller.getComplete);
module.exports = router;