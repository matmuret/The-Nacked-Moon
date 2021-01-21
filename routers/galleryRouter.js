import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import dataShop from "../dataShop.js";
import Photo from "../models/galleryModel.js";
import multer from "multer";
import path from'path';


const galleryRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photosupload/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    /* cb(null, new Date().toISOString() + file.originalname); */
    /* let fileName = file.originalname.replace(/\./g, "-") */
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
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
});

// send products to the frontend
galleryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const photos = await Photo.find({});
    res.send(photos);
  })
);

galleryRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      await Photo.deleteMany({});
    } catch (e) {
      console.log(e);
    }
    const createdPhoto = await Photo.insertMany(dataShop.photos);
    res.send({ createdPhoto });
  })
);

galleryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    if (photo) {
      res.send(photo);
    } else {
      res.status(404).send({ message: "Photo Not Found" });
    }
  })
);

//add photos to the DB
galleryRouter.post("/", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  const photo = new Photo({
    _id: new mongoose.Types.ObjectId(),
    albumName:req.body.albumName,
    image: `${req.protocol}://${req.get('host')}/api/photosupload/${req.file.filename}`, 
    category:req.body.category,
    description: req.body.description,
  });
  photo
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created photo successfully",
        createdPhoto: {
          _id: result._id,
          image: result.image,
          albumName:result.albumName,
          category:result.category,
          description: result.description,
          request: {
            type: "GET",
            url: "http://localhost:5000/api/photoup" + result._id,
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
export default galleryRouter;