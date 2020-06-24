const multer = require('multer')
const path = require('path')

//first set storage => file name and destination
const storage = multer.diskStorage({
  //first our detination uploads folder
  destination: function (req, res, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    //generate unique name for each image
    cb(null, 'congar' + '-' + Date.now()+path.extname(file.originalname))
  }
})

//file filter we eccept any file we will do validation later
const filerFilter = (req, file, cb) => {
  cb(null, true)
}

let upload = multer({
  storage: storage,
  fileFilter: filerFilter
})

//export upload as single file you can use multiple
module.exports = upload.single('categoryImage')
