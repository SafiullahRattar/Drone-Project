import mongoose from "mongoose";

const AdressSchema = new mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  latitude: {
    type: Number,
    required: true,
  },
  logitude: {
    type: Number,
    required: true,
  },
});

const Address = mongoose.model("Address", AdressSchema);
export default Address;
