import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import dataShop from "../dataShop.js";
import Album from "../models/albumModel.js";

import photoUpload from '../middleware/photoUpload.js'


const albumRouter = express.Router();

/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photosupload/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}); */

// send products to the frontend
albumRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const photos = await Album.find({});
    res.send(photos);
  })
);

albumRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      await Photo.deleteMany({});
    } catch (e) {
      console.log(e);
    }
    const createdPhoto = await Album.insertMany(dataShop.photos);
    res.send({ createdPhoto });
  })
);

albumRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (album) {
      res.send(album);
    } else {
      res.status(404).send({ message: "Photo Not Found" });
    }
  })
);

//add photos to the DB
albumRouter.post("/", photoUpload.array("images"), (req, res, next) => {
  console.log(req.files);
  const imgUrl=req.files.map((file)=>{
    return `${req.protocol}://${req.get('host')}/api/photosupload/${file.filename}`
  })
  console.log(imgUrl)
  const album = new Album({
    _id: new mongoose.Types.ObjectId(),
    albumName:req.body.albumName,
    images: imgUrl,
    category:req.body.category,
    description: req.body.description,
  });
  album
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created album successfully",
        createdAlbum: {
          _id: result._id,
          images: result.images,
          albumName:result.albumName,
          category:result.category,
          description: result.description,
          request: {
            type: "GET",
            url: "http://localhost:5000/api/albumup" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
export default albumRouter;