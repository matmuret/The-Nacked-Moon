import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import dataShop from "../dataShop.js";
import Product from "../models/productModel.js";
import multer from "multer";
import path from'path';
/* import  { path }  from "../models/productModel" */

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "productsupload/");
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
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    try {
      await Product.deleteMany({});
    } catch (e) {
      console.log(e);
    }
    const createdProducts = await Product.insertMany(dataShop.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//add products to the DB
productRouter.post("/", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    image: req.file.path,
    price: req.body.price,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    description: req.body.description,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          price: req.body.price,
          countInStock: req.body.countInStock,
          rating: req.body.rating,
          numReviews: req.body.numReviews,
          description: req.body.description,
          request: {
            type: "GET",
            url: "http://localhost:5000/api/Shop" + result._id,
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
export default productRouter;
