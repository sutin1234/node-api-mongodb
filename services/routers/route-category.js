var express = require("express");
var app = express();
var router = express.Router();
var mongoService = require("../mongo_service");
var conf = require("../providers/config");
const objectID = require("mongodb").ObjectID;

router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.get("/find/all", (req, res) => {
    let list = mongoService.findDocument("doc_category");
    list.then(data => {
        res.json(data);
    });
});

module.exports = router;