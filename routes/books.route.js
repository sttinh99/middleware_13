const express = require("express");
var shortid = require("shortid");
var db = require('../db');

var controller = require('../controller/books.controller');
var validation = require("../validation/books.validation");

var router = express.Router();


router.get("/", controller.index);
router.get("/create",controller.getCreate );
router.post("/create",validation.postCreate,controller.postCreate );
router.get("/:id/update",controller.getUpdate);
router.post("/update",controller.postUpdate);  
router.get('/:id/delete',controller.delete);

module.exports = router;