
const express = require('express')
const { sign } = require('jsonwebtoken')
const router = express.Router()
const { register, verifyEmail, resendVerification, forgetPassword, resetPassword, userDEtails, userUpdate, getUserList, signIn, signOut } = require('../controller/userController')
const { userCheck, validate } = require('../validaition')

router.post('/register',userCheck,validate,register)
router.get(`/verifyemail/:token`,verifyEmail)
router.post(`/resendVerification`,resendVerification)
router.post(`/forgetpassword`,forgetPassword)
router.post(`/resetpassword/:token`,resetPassword)
router.get(`/userdetails`,userDEtails)
router.post(`/updateuser/:id`,userUpdate)
router.get(`/userlist`,getUserList)
router.post(`/signin`,signIn)
router.get(`/signout`,signOut)
module.exports = router