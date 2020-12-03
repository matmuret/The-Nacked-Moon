import express from 'express';
import dataShop from "./dataShop.js";

const app=express();

app.get("/api/Shop", (req,res)=>{
    res.send(dataShop.products)
})

app.get("/",(req,res)=>{
    res.send('Server is ready');
})
const port = process.env.port || 5000
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`)
})