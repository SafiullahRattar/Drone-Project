import mongoose from "mongoose";

const pathModel = new mongoose.Schema({
  delivery_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery",
  },
  location: {
    type: [Number],
    required: true,
  },
  weight: Number,
  quantity: Number,
  priority: Number,
  time: Number,
});

const pathSchema = new mongoose.Schema({
  path: {
    type: [pathModel],
  },
});

const Path = mongoose.model("Path", pathSchema);

export default Path;
