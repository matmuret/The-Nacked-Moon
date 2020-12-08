import express from "express";
import mongoose from "mongoose";
import dataShop from "./dataShop.js";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/thenakedmoon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function() {
  console.log("Database connection established...");
});
app.get("/api/Shop/:id", (req, res) => {
  const product = dataShop.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/Shop", (req, res) => {
  res.send(dataShop.products);
});
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});
const port = process.env.port || 5001;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})
