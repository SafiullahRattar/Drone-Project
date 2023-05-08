import mongoose from "mongoose";

const pathModel = new mongoose.Schema({
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery",
    required: true,
  },
  time_elapsed: {
    type: Number,
    required: true,
  },
  battery_level: {
    type: Number,
    required: true,
  },
});

const pathSchema = new mongoose.Schema({
  path: {
    type: [pathModel],
  },
});

const Path = mongoose.model("Path", pathSchema);

export default Path;
