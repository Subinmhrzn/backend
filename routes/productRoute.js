const express = require('express')
const { addProduct, getAllProducts, updateProducts, productByCategory, productDetails, productDelete, getFilteredProduct } = require('../controller/productController')
const { requireSignin } = require('../controller/userController')

const upload = require('../uttlis/fileUplod')
const { validate } = require('../validaition')
const router = express.Router()


router.post('/addproduct',upload.single('product_image'),requireSignin,validate,addProduct)
router.post('/addproduct', addProduct)
router.get('/getallproducts',getAllProducts)
router.put('/updateproduct/:id',upload.single('product_image'),requireSignin,updateProducts)
router.get('/productbycategory/:category_id',productByCategory)
router.get('/details/:id',productDetails)
router.delete('/deleteproduct/:id',requireSignin,productDelete)
router.post('/getfilteredproduct',getFilteredProduct)
module.exports = router