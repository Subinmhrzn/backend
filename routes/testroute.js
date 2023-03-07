const express = require('express')
const { testfunction, hellofunction } = require('../controller/testcontroller')
const router = express.Router()


router.get('/first', testfunction)
router.get('/hello/:name', hellofunction)

module.exports = router