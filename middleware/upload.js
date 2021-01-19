const multer = require("multer")

/**
 * WHERE DOES MULTER STORE FILE INFORMATION?
 * req.file => for just ONE file
 * req.files => for multiple files
 */
// MULTER configuration
const storage = multer.diskStorage({
  destination: "productsupload",
  // filename function will construct a filename
  // that will be used to store the file
  filename: (req, file, done) => {
    let filenameUpload = `${req.user._id}-${file.originalname}`
    done(null, filenameUpload)
  }
})
// File upload middleware
const upload = multer({
  storage: storage
})
module.exports = upload