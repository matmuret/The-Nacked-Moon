import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import dataShop from "../dataShop.js";
import Image from "../models/imageModel.js";

import photoUpload from "../middleware/photoUpload.js";

const imageRouter = express.Router();

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
imageRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const photos = await Image.find({});
    res.send(photos);
  })
);

imageRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      await Photo.deleteMany({});
    } catch (e) {
      console.log(e);
    }
    const createdPhoto = await Image.insertMany(dataShop.photos);
    res.send({ createdPhoto });
  })
);

imageRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const photo = await Image.findById(req.params.id);
    if (photo) {
      res.send(photo);
    } else {
      res.status(404).send({ message: "Photo Not Found" });
    }
  })
);

//add photos to the DB
imageRouter.post("/", photoUpload.single("image"), (req, res, next) => {
  console.log(req.file);
  const photo = new Photo({
    _id: new mongoose.Types.ObjectId(),
    albumName: req.body.albumName,
    image: `${req.protocol}://${req.get("host")}/api/photosupload/${
      req.file.filename
    }`,
    category: req.body.category,
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
          albumName: result.albumName,
          category: result.category,
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

imageRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    const photo = await Image.findByIdAndDelete(req.params.id);
    if (photo) {
      res.send(photo);
    } else {
      res.status(404).send({ message: "Photo Not Found" });
    }
  })
);
export default imageRouter;
