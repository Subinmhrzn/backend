const Product = require('../MOdel/productModel')


// add product

exports.addProduct = async(req,res)=>{
    if(!req.file){
        return res.status(400).json({error:"file not selected"})
    }
    let productToAdd = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.file.path,
        count_in_stock:req.body.count_in_stock,
        category: req.body.category
    })
    productToAdd = await productToAdd.save()
    if(!productToAdd){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(productToAdd)
}

// to view all products

exports.getAllProducts = async(req, res)=>{
    let products = await Product.find().populate('category' ,'category_name')
    if(!products){
        return res.status(400).json({error:"Something wemt wrong"})
    }
    else(
        res.send(products)
    )
}

// to update products

exports.updateProducts = async(req,res)=>{
    let productToUpdate = await Product.findByIdAndUpdate(req.params.id,
        req.file?
        {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.file.path,
        count_in_stock:req.body.count_in_stock,
        category: req.body.category,
        rating: req.body.rating
    }:
    {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock:req.body.count_in_stock,
        category: req.body.category,
        rating: req.body.rating

    },{new:true})
    if(!productToUpdate){
        return res.status(400).json({error:"something went wrong"})
    }
    else{
        res.send(productToUpdate)
    } 
}

// get products of same category

exports.productByCategory = async(req,res)=>{
    let products = await Product.find({category: req.params.category_id})
    if(!products){
        return res.status(400).json({error:"Something wemt wrong"})
    }
    else(
        res.send(products)
    )
}

// to get products details
exports.productDetails = async(req,res)=>{
    let product = await Product.findById(req.params.id).populate('category')
    if(!product){
        return res.status(400).json({error:"Something wemt wrong"})
    }
    else(
        res.send(product)
    )

}

// to delete product
exports.productDelete = async(req,res)=>{
    try{
    let productToDelete= await Product.findByIdAndDelete(req.params.id)
    if(!productToDelete){
        return res.status(400).json({error:"Product not found"})
    }
    else{
        return res.status(200).json({message:"Product deleted succesfully"})
    }
}
catch(error){
    return res.status(400).json({error:"error.message"})
}
}

// to get filtered product
exports .getFilteredProduct = async(req,res)=>{
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
    let order = req.query.order ? req.query.order : '1'
    let limit = req.query.limit ? Number(req.query.limit) : 999999999
    console.log(req.body)
    let Args = {}
    for(key in req.body.filter){
        if(req.body.filter[key].length>0){
            if(key== 'product_price'){
                Args[key]={
                    $gte : req.body.filter[key][0],
                    $lte : req.body.filter[key][1]
                }
            }
            else{
                Args[key] = req.body.filter[key ]
            }
        }
    }
    let FilteredProducts = await Product.find(Args).populate('category').sort(([[sortBy, order]])).limit(limit)
    if(!FilteredProducts){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(FilteredProducts)
}