import express from "express";
import expressAsyncHandler from "express-async-handler";
import dataShop from "../dataShop.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

// send products to the frontend
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
  
    const products =await Product.find({});
    res.send(products);
}));

productRouter.get(
  "/seed",
  expressAsyncHandler((async (req, res) => {
    try {
        await Product.deleteMany({});
      } catch (e) {
        console.log(e);
      }
    const createdProducts = await Product.insertMany(dataShop.products);
    res.send({ createdProducts });
  }))
);

productRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
  
  
    const product= await Product.findById(req.params.id);
    if(product){
    
        res.send(product);
    }else{
        res.status(404).send({message:'Product Not Found'});
    }
}))
export default productRouter;
