import expressAsyncHandler from "express-async-handler";
import Drone from "../models/droneModel";

const getAllDrones = expressAsyncHandler(async (req, res) => {
  const drones = await Drone.find({});
  res.status(200).json({ drones });
});

const addDrone = expressAsyncHandler(async (req, res) => {
  const {
    id,
    name,
    status,
    currentLocation,
    batteryLevel,
    lastMaintenanceDate,
    weightCapacity,
    maxFlightDistance,
    deliveryRange,
    deliveryCapacity,
    speed,
    chargeRate,
    drainRate,
    bcr,
    totalBatteryCapacity,
  } = req.body;

  const newDrone = new Drone({
    id,
    name,
    status,
    currentLocation,
    batteryLevel,
    lastMaintenanceDate: new Date(lastMaintenanceDate),
    weightCapacity,
    maxFlightDistance,
    deliveryRange,
    deliveryCapacity,
    speed,
    chargeRate,
    drainRate,
    bcr,
    totalBatteryCapacity,
  });

  const createdDrone = await newDrone.save();
  res.status(201).json({ drone: createdDrone });
});

const deleteDrone = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedDrone = await Drone.findByIdAndDelete(id);
  if (!deletedDrone) {
    res.status(404).json({ message: "Drone not found" });
    throw new Error("Drone not found");
  }

  res.status(200).json({ drone: deletedDrone });
});

// @route   PUT api/admin/drones/:id
// @desc    Update a drone
// @access  Private (admin only)
const updateDrone = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    name,
    status,
    currentLocation,
    batteryLevel,
    lastMaintenanceDate,
    weightCapacity,
    maxFlightDistance,
    deliveryRange,
    // deliveryCapacity,
    speed,
    chargeRate,
    drainRate,
    bcr,
    totalBatteryCapacity,
  } = req.body;

  const drone = await Drone.findById(id);

  if (drone) {
    drone.name = name || drone.name;
    drone.status = status || drone.status;
    drone.currentLocation = currentLocation || drone.currentLocation;
    drone.batteryLevel = batteryLevel || drone.batteryLevel;
    drone.lastMaintenanceDate =
      lastMaintenanceDate || drone.lastMaintenanceDate;
    drone.weightCapacity = weightCapacity || drone.weightCapacity;
    drone.maxFlightDistance = maxFlightDistance || drone.maxFlightDistance;
    drone.deliveryRange = deliveryRange || drone.deliveryRange;
    // drone.deliveryCapacity = deliveryCapacity || drone.deliveryCapacity;
    drone.speed = speed || drone.speed;
    drone.chargeRate = chargeRate || drone.chargeRate;
    drone.drainRate = drainRate || drone.drainRate;
    drone.bcr = bcr || drone.bcr;
    drone.totalBatteryCapacity =
      totalBatteryCapacity || drone.totalBatteryCapacity;

    const updatedDrone = await drone.save();
    res.status(200).json({ drone: updatedDrone });
  } else {
    res.status(404);
    throw new Error("Drone not found");
  }
});

// @route   GET api/admin/drones/:id
// @desc    Get a single drone by ID
// @access  Private (admin only)
const getDroneById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const drone = await Drone.findById(id);

  if (drone) {
    res.json(drone);
  } else {
    res.status(404);
    throw new Error("Drone not found");
  }
});

export { getAllDrones, addDrone, deleteDrone, updateDrone, getDroneById };
