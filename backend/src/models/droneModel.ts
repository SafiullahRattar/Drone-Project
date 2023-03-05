import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
  droneId: { type: String, required: true, unique: true },
  name: {type: String, required: true},
  status: {
    type: String,
    enum: ["available", "in use", "maintenance"],
    required: true,
  },
  currentLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  batteryLevel: { type: Number, required: true },
  lastMaintenanceDate: { type: Date, required: true },
});

const Drone = mongoose.model("Drone", droneSchema);

export default Drone;
