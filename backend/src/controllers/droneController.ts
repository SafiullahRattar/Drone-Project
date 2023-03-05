import expressAsyncHandler from "express-async-handler";
import Drone from "../models/droneModel";

const getAllDrones = expressAsyncHandler(async (req, res) => {
  const drones = await Drone.find({});
  res.status(200).json({ drones });
});

const addDrone = expressAsyncHandler(async (req, res) => {
  const { name, status, currentLocation, batteryLevel, lastMaintenanceDate } =
    req.body;

  const newDrone = new Drone({
    name,
    status,
    currentLocation,
    batteryLevel,
    lastMaintenanceDate,
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

const updateDrone = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, status, currentLocation, batteryLevel, lastMaintenanceDate } =
    req.body;

  const drone = await Drone.findById(id);
  if (!drone) {
    res.status(404).json({ message: "Drone not found" });
    throw new Error("Drone not found");
  }

  drone.name = name ?? drone.name;
  drone.batteryLevel = batteryLevel ?? drone.batteryLevel;
  drone.currentLocation = currentLocation ?? drone.currentLocation;
  drone.lastMaintenanceDate = lastMaintenanceDate ?? drone.lastMaintenanceDate;
  drone.status = status ?? drone.status;

  const updatedDrone = await drone.save();
  res.status(200).json({ drone: updatedDrone });
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
