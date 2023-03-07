const express = require('express')
const { placeOrder, getAllOrders, getOrderDetails, getUserOrders, updateOrder, deleteOrder } = require('../controller/orderController')
const router = express.Router()

router.post('/placeorder',placeOrder)
router.get('/orders',getAllOrders)
router.get('/orderdetail/:id',getOrderDetails)
router.get('/userorder/:userid',getUserOrders)
router.put('/updateorder/:orderid',updateOrder)
router.delete('/deleteorder/:orderid',deleteOrder)

module.exports = router