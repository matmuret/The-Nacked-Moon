import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    albumId: {
      type: mongoose.ObjectId,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Image = mongoose.model("Image", imageSchema);
export default Image;
