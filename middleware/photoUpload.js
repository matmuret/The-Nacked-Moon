import multer from "multer";
import Datauri from "datauri";
import path from "path";

/**
 * WHERE DOES MULTER STORE FILE INFORMATION?
 * req.file => for just ONE file
 * req.files => for multiple files
 */

// MULTER configuration
// filename function will construct a filename
// that will be used to store the file
/* const storage = multer.diskStorage({
  destination: 'photosupload',
  filename: (req, file, done) => {
    let date = new Date();
    let filenameUpload = `${date.getTime()}-${
      file.originalname
    }`;
    done(null, filenameUpload);
  },
}); */

// File upload middleware
/* const photoUpload = multer({
  storage: storage,
}); */

const storage = multer.memoryStorage();
const photoUpload = multer({ storage });
const dUri = new Datauri();

const dataUri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { photoUpload, dataUri };
