import express from "express";
import mongoose from "mongoose";
/* import dataShop from "./dataShop.js"; */
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from 'dotenv';
import cors from  'cors';
import orderRouter from "./routers/orderRouter.js";
import albumRouter from "./routers/albumRouter.js";
import Bodyparser from "body-parser"
import morgan from'morgan'; 
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:true}));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/thenakedmoon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function() {
  console.log("Database connection established...");
});
/* app.get("/api/Shop/:id", (req, res) => {
  const product = dataShop.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
}); */

/* app.get("/api/Shop", (req, res) => {
  res.send(dataShop.products);
}); */

app.use('/api/photosupload', express.static('photosupload'));
app.use('/api/productsupload', express.static('productsupload'));
app.use("/api/albumup", albumRouter)
app.use("/api/users", userRouter);
app.use("/api/Shop",productRouter);
app.use("/api/orders", orderRouter);
app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get("/", (req, res) => {
  res.send("Server is ready");
});
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})
