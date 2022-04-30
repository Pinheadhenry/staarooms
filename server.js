if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true}))

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => {console.error(error)})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const adminRouter = require('./routes/adminPage')

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/admin', adminRouter)

app.listen(process.env.PORT || 3000)