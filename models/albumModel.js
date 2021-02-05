import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    albumName: { type: String, required: false, /* unique:true */ },
    /*  images: [{imageId:{type: mongoose.ObjectId, required: false, ref:'Image'}}], */
    images: [String],
    description: { type: String, required: false },
    category: {
      type: String,
      required: false,
      enum: ["home", "outdoors", "fashion", "souls", "projects"],
    },
  },

  {
    timestamps: true,
  }
);
const Album = mongoose.model("Album", albumSchema);
export default Album;
