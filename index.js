const express = require("express")
require('dotenv').config()
require('./Datebase/connection')

var bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
// routes
const TestRoute = require('./routes/testroute')
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')
const PaymentRoute = require('./routes/paymentRoute')

const app = express()
const port = process.env.PORT

app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api',TestRoute)
app.use('/api', CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api',userRoute)
app.use('/api',OrderRoute)
app.use('/api',PaymentRoute)
// use static
app.use('/api/public/uploads',express.static('public/uploads'))

const testfunction = (request,response)=>{
    response.send("Hello World")
}
app.get("/hello", testfunction)





app.listen(port,()=>{
    console.log(`App Started at port ${port}`)
})