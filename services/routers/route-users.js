var express = require('express')
var app = express()
var router = express.Router()
var mongoService = require('../mongo_service')
var conf = require('../providers/config')
const objectID = require('mongodb').ObjectID
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(function timeLog(req, res, next) {
    console.log('Users Time: ', Date.now())
    next()
})
router.get('/', (req, res) => {
    res.json({ status: 200, text: 'Route users OK!' })
})
router.get('/find/all', (req, res) => {
    let list = mongoService.findDocument('users')
    list.then(data => {
        res.json(data)
    })
})
router.get('/find/:id', (req, res) => {
    let user_id = req.params.id
    let query = {
        id: user_id
    }
    let list = mongoService.findDocumentByQuery('users', query)
    list.then(data => {
        res.json(data)
    })
})
router.get('/delete/:objectID', (req, res) => {
    let objectID = req.params.objectID
    let list = mongoService.deleteDocument('users', objectID)
    list.then(data => {
        res.json(data)
    })
})
router.post('/add', urlencodedParser, (req, res) => {
    if (!req.body) res.redirect('/')
    let bodyAdded = req.body
    let list = mongoService.addOneDocument('users', bodyAdded)
    list.then(data => {
        res.json(data)
    })
})

router.post('/update', urlencodedParser, (req, res) => {
    if (!req.body) res.redirect('/')
    let bodyUpdate = req.body
    let list = mongoService.updateDocument('users', bodyUpdate._id, bodyUpdate)
    list.then(data => {
        res.json(data)
    })
})

router.post('/login', urlencodedParser, (req, res) => {
    console.log(req.body)
    if (!req.body) res.redirect('/')
    var query = {
        user: req.body.username,
        password: req.body.password
    }
    let find = mongoService.findDocumentByQuery('users', query)
    find.then(data => {
            if (data.length == 0) {
                res.json(data)
            } else {
                res.json(data[0])
            }
        })
        // res.json('OK')
})
module.exports = router