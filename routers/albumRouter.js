import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import dataShop from "../dataShop.js";
import Album from "../models/albumModel.js";

import { photoUpload } from "../middleware/photoUpload.js";

mongoose.set("useFindAndModify", false);
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
  "/bycategory",
  expressAsyncHandler(async (req, res) => {
    const albums = await Album.find({ category: req.query.name });
    /* console.log(albums) */
    if (albums) {
      res.send(albums);
    } else {
      res.status(404).send({ message: "Albums Not Found" });
    }
  })
);

albumRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id);
    /*  console.log(album) */
    if (album) {
      res.send(album);
    } else {
      res.status(404).send({ message: "Album Not Found" });
    }
  })
);
albumRouter.put(
  "/delete/:images",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    const image = req.params;
    console.log(
      JSON.stringify(image).substring(10, JSON.stringify(image).length - 1)
    );
    const filterAlbum = await Album.filter((list) => list !== image);
    console.log(filterAlbum);
    const album = await Album
      .findOneAndUpdate
      /* {images: { $in: [JSON.stringify(image).substring(10,36)] }}, */
      /* { $pull: {  images: { $in: [JSON.stringify(image).substring(10,36)] }} },
      { multi: true } */
      /*  {useFindAndModify:false} */
      ();

    /* console.log(album) */
    if (album) {
      res.send(album);
    } else {
      res.status(404).send({ message: "Photo Not Deleted" });
    }
  })
);
albumRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const album = await Album.findByIdAndDelete(req.params.id);
    /* console.log(album) */
    if (album) {
      res.send(album);
    } else {
      res.status(404).send({ message: "Album Not Deleted" });
    }
  })
);
//add photos to the DB
albumRouter.post("/", photoUpload.array("images"), (req, res, next) => {
  /* console.log(req.files); */
  const imgUrl = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/api/photosupload/${
      file.filename
    }`;
  });
  console.log(imgUrl);
  const album = new Album({
    _id: new mongoose.Types.ObjectId(),
    albumName: req.body.albumName,
    images: imgUrl,
    category: req.body.category,
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
          albumName: result.albumName,
          category: result.category,
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

albumRouter.put("/:id", photoUpload.array("images"), async (req, res, next) => {
  /* console.log(req.files); */
  const imgUrls = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/api/photosupload/${
      file.filename
    }`;
  });
  console.log(imgUrls);
  const album = await Album.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { images: imgUrls } },
    { new: true }
  );

  res.status(201).json({
    message: "Updated album successfully",
    updatedAlbum: {
      _id: album._id,
      images: album.images,
      albumName: album.albumName,
      category: album.category,
      description: album.description,
      request: {
        type: "GET",
        url: "http://localhost:5000/api/albumup/" + album._id,
      },
    },
  });
});
export default albumRouter;
