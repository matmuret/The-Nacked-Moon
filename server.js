import express from 'express';
import dataShop from "./dataShop.js";

const app=express();

app.get("/api/Shop/:id", (req,res)=>{
    const product=dataShop.products.find(x=>x._id === req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:"Product not found"})
    }
});

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