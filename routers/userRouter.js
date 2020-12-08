import express from "express";
import expressAsyncHandler from 'express-async-handler';
import dataShop from "../dataShop.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get("/seed", expressAsyncHandler((async (req, res) => {
    try {
        await User.deleteMany({});
      } catch (e) {
        console.log(e);
      }
  const createdUsers = await User.insertMany(dataShop.users);
  /* console.log(createdUsers) */
  res.send({ createdUsers });
}))) ;

export default userRouter;
