import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import dataShop from "../dataShop.js";
import Product from "../models/productModel.js";
import upload from "../middleware/upload.js";

const productRouter = express.Router();

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
  console.log(req.body);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    image: `${req.protocol}://${req.get('host')}/api/productsupload/${req.file.filename}`, 
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
          date: result.date,
          image: result.image,
          price: result.price,
          category: result.category,
          _id: result._id,
          countInStock: result.countInStock,
          rating: result.rating,
          numReviews: result.numReviews,
          description: result.description,
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
