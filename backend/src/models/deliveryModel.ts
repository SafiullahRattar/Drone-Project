import mongoose from "mongoose";
import Address from "./addressModel";
import Package from "./packageModel";
import User from "./userModel";

const deliverySchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Package,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "delivered"],
    required: true,
  },
  // pickup_location: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: Address,
  //   required: true,
  // },
  // drop_location: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: Address,
  //   required: true,
  // },
  distance: {
    type: Number,
    default: 0
  },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
