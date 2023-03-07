const express = require('express')
const { addCategory, getAllCategories, getAllCategoryDetails, updateCategory, deleteCategory } = require('../controller/catergoryController')
const { requireSignin } = require('../controller/userController')
const { categoryCheck, validate } = require('../validaition')
const router = express.Router()

router.post('/addcategory',requireSignin,validate,categoryCheck,addCategory)
router.get('/getallcategories',getAllCategories)
router.get('/categorydetails/:id',getAllCategoryDetails)
router.put('/updatecategory/:id',requireSignin,updateCategory)
router.delete('/deletecategory/:id',requireSignin,deleteCategory)


module.exports = router