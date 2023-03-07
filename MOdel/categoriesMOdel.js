const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name: {
        type: "string",
        required: true,
        trim: true
    }
},{timestamps:true})

// categories - category_name, _id, createdAt, updatedAt

module.exports = mongoose.model("Category",categorySchema)