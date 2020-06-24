const express = require('express')
const router = express.Router()

//now use multer
const uploadMulter = require('../middlewares/upload.js')
//Validations
const validation = require('../middlewares/validation.js')
// Controller
const {
  createCategory
} = require('../controllers/category.controllers.js')

router.post('/category', uploadMulter, validation, createCategory)

module.exports = router
