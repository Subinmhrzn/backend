let Order = require('../MOdel/OrderModel')
let OrderItems = require('../MOdel/OrderItemModel')

// place order
exports.placeOrder = async(req,res)=>{
    let orderItemsIds = await Promise.all(
        req.body.orderItems.map(async orderItems=>{
            let orderItemToAdd = new OrderItems({
            product : orderItems.product,
            quantity : orderItems.quantity
        })
        orderItemToAdd = await orderItemToAdd.save()
        if(!orderItemToAdd){
            return res.status(400).json({error:"Something went wrong"})
        }
        return orderItemToAdd._id
    })
    )
    
// calculate total price
let individualTotal = await Promise.all(
    orderItemsIds.map(async orderItemsId=>{
        let item = await OrderItems.findById(orderItemsId).populate('product','product_price')
        return item.quantity*item.product.product_price
    })
)
let totalprice = individualTotal.reduce((acc,cur)=>acc+cur)

let newOrder = new Order({
    orderItems: orderItemsIds,
    user:req.body.user,
    shhiping_address : req.body.shhiping_address,
    alternate_shhiping_address : req.body.alternate_shhiping_address,
    city:req.body.city,
    country:req.body.country,
    zipcode:req.body.zipcode,
    phone:req.body.phone,
    totalprice: totalprice,
    payment_info : req.body.payment_info
})
newOrder = await newOrder.save()
if(!newOrder){
    return res.status(400).json({error:"Failed to place order"})
}
res.send(newOrder)
}

// to view all orders
exports.getAllOrders = async(req,res)=>{
    let orders = await Order.find().populate({path:'orderItems',populate:{path:'product',populate:{path:'category'}}})
    .populate('user','username')
    if(!orders){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(orders)
}

// to get order detail
exports.getOrderDetails = async (req,res)=>{
    let order = await Order.findById(req.params.id)
    .populate({path:'orderItems',populate:{path:'product',populate:{path:'category'}}})
    .populate('user','username')
    if(!order){
        return res.status(400).json({error:"Something went wrong"})

    }
    res.send(order)
}

// to get orders of user
exports.getUserOrders = async(req,res)=>{
    let orders = await Order.find({user:req.params.userid})
    .populate({path:'orderItems',populate:{path:'product',populate:{path:'category'}}})
    .populate('user','username')
    if(!orders){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(orders)
}

// to update order status
exports.updateOrder = async(req,res)=>{
    let order = await Order.findByIdAndUpdate(req.params.orderid,{
        status: req.body.status
    },{new: true})
    if(!order){
      return res.status(400).json({error:"Something went wrong"})

    }
    res.send(order)
}

// to delete order
exports.deleteOrder = (req,res)=>{
    Order.findByIdAndRemove(req.params.orderid)
    .then(order=>{
       if(order==null){
        return res.status(400).json({error:"Order not found"})
       }
       order.orderItems.map(orderItem=>{
        OrderItems.findByIdAndDelete(orderItem)
        .then(orderItem=>{
            if(!orderItem)
            return res.status(400).json({error:"Something went wrong"})
        })
    })
    res.send({message:"Order deleted"})
    })
    .catch(error=>res.status(400).json({error:error.message}))
}