const mongoose = require('mongoose')
const{ObjectId} =  mongoose.Schema

const orderSchema= new mongoose.Schema({
    orderItems:[{
        type:ObjectId,
        ref : "OrderItems",
        required : true}
    ],
    user:{
        type:ObjectId,
        ref:"user",
        required:true
    },
    shhiping_address:{
        type:String,
        required:true
    },
    alternate_shhipping_address:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
    type:String,
    required:true
    },
    status:{
        type:String,
        default:"pending",
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    }
    

},{timestamps:true})

module.exports = mongoose.model("Order",orderSchema)