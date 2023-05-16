import mongoose from "mongoose";

const droneModelSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "in-use", "maintenance"],
    required: true,
  },
  currentLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  batteryLevel: { type: Number, required: true },
  lastMaintenanceDate: { type: Date, required: true },
  weightCapacity: { type: Number, required: true },
  maxFlightDistance: { type: Number },
  deliveryRange: { type: Number },
  // deliveryCapacity: { type: Number },
  speed: { type: Number },
  chargeRate: Number,
  drainRate: Number,
  bcr: Number,
  totalBatteryCapacity: Number,
});

const Drone = mongoose.model("Drone", droneModelSchema);

export default Drone;
