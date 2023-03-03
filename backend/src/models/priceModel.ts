import mongoose, { Schema } from "mongoose";

const pricePlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const PricePlan = mongoose.model("PricePlanModel", pricePlanSchema);
export default PricePlan;
