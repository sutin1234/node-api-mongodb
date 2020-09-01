var express = require("express");
var app = express();
var router = express.Router();
var mongoService = require("../mongo_service");
var conf = require("./config");
const objectID = require("mongodb").ObjectID;

//database files
var products = require("../products_service");

router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.get("/find/all", (req, res) => {
    let list = mongoService.findDocument("doc_product");
    list.then(data => {
        res.json(data);
    });
});

router.get("/find/:id", (req, res) => {
    let id = req.params.id;
    let query = {
        id: parseInt(id)
    };
    let list = mongoService.findDocumentByQuery("doc_product", query);
    list.then(data => {
        res.json(data);
    });
});
router.get("/search/:value", (req, res) => {
    let value = req.params.value;
    let query = { $or: [{ name: new RegExp(value, 'i') }, { detail: new RegExp(value, 'i') }] }; // LIKE keyword
    let list = mongoService.findDocumentByQuery("doc_product", query);
    list.then(data => {
        res.json(data);
    });
});
router.get('/delete/:_id', (req, res) => {
    let param = req.params._id;
    let _id = ObjectID(param);
    let doc = mongoService.deleteDocument("doc_product", _id);
    doc.then(data => {
        res.json({
            status: true,
            text: 'delete _id: ' + _id + 'success'
        })
    })
});

router.post("/update", (req, res) => {
    if (!req.body) {
        res.redirect('*', 505);
    }
    let doc = mongoService.updateDocument("doc_product", req.body._id, req.body);
    doc.then(data => {
        res.json({
            status: true,
            text: "update _id: " + req.body._id + "success"
        });
    });
});


router.post("/addOne", (req, res) => {
    /*
    let dataAdded = {
        id: 123456,
        name: "CCTV WIFI Test Add",
        pc_id: 117,
        detail: "กล้องวงจรปิด wifi",
        feature: "empty",
        application: "empty",
        photo: "WIFI_(Medium).jpg",
        created: new Date(),
        pc_name: "กล้อง IP CAMERA Test"
    };
    */
    if (!req.body) {
        console.log(req.body)
        res.redirect('*', 505);
    }
    let added = mongoService.addOneDocument("doc_product", dataAdded);
    added.then(result => {
        console.log(result)
        res.json(result);
    });
});


module.exports = router;