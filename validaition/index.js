const {check, validationResult} = require('express-validator')

exports.categoryCheck = [
    check('category_name','category name is required').notEmpty()
    .isLength({min:3}).withMessage('Category name must me atleast 3 characters')
]

exports.validate = (req,res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()
}

exports.porductCheck = [
    check('product_name','product name is required').notEmpty()
    .isLength({min:3}).withMessage("Product name must be atleast 3 characters"),

    check('product_price','price is required').notEmpty()
    .isNumeric().withMessage("Price must be a number"),

    check('product_descriprion','Description is requied').notEmpty()
    .isLength({min:20}).withMessage("Desciption must be at least 20 characters"),

    check('category','category is required').notEmpty(),
    
    check('count_in_stock','Count in stock ius required').notEmpty()
    .isNumeric().withMessage("Count must be in number")
]

exports.userCheck=[
    check('username','username is required').notEmpty()
    .isLength({min:3}).withMessage("Username must be atleast 3 letters"),

    check('email','email is required').notEmpty()
    .isEmail().withMessage("Email format incorrect"),

    check('password','password is required').notEmpty()
    .isLength({min:8}).withMessage("Password must contain atleast 8 character")
    .not().isIn(['asdf1234',/password/i,'12345678']).withMessage("Cannot use common words")
    .matches(/[a-z]/).withMessage("Password must contain atleast one lowercase charachter")
    .matches(/[A-Z]/).withMessage("Password must contain atleast one uppercase charachter")
    .matches(/[0-9]/).withMessage("Password must contain atleast one numeric character")
    .matches(/[+-_!@#$^]/).withMessage("Password must contain atleast one special charachter")
    .not().matches(/[\\;:>,]/).withMessage("/ , . ; : and, are not allowed in password")
]