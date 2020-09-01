var app = require('express')()
var bodyParser = require('body-parser')
var port = process.env.PORT || 7000
var cors = require('cors')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(cors())

var product_provider = require('./services/providers/product-provider')
app.use('/product', product_provider)

var category_route = require('./services/routers/route-category')
app.use('/category', category_route)

var users_route = require('./services/routers/route-users')
app.use('/users', users_route)

app.get('/', (req, res) => {
    console.log('route: ' + req.originalUrl)
    res.json({ status: 200, 'text': 'welcome to mongodb' });
})
app.get('*', (req, res) => {
    console.log('route: ' + req.originalUrl)
    res.send('<h1>Route: [' + req.originalUrl + '] Not Found</h1>')
})

app.listen(port, function() {
    console.log('Server Running on port ' + port)
})