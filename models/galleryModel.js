import mongoose from 'mongoose';

const gallerySchema= new mongoose.Schema(
 {
    albumName:{type:String,required:true,},
    image:{type:String,required:true},
    category:{type:String,required:true},
    description: { type: String, required: false },
 },{
    timestamps:true,
 }
); 
const Photo= mongoose.model('Photo',gallerySchema)
export default Photo;