import expressAsyncHandler from "express-async-handler";
import Package from "../models/packageModel";

export const getPackages = expressAsyncHandler(async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "" });
  }
});

export const addPackage = expressAsyncHandler(async (req, res) => {
  const package_data = req.body;

  try {
    const savedPackage = await Package.create(package_data);
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(400).json({ message: "" });
  }
});

export const getPackageById = expressAsyncHandler(async (req, res) => {
  try {
    const package_data = await Package.findById(req.params.id);
    res.json(package_data);
  } catch (err) {
    res.status(500).json({ message: "" });
  }
});

export const updatePackageById = expressAsyncHandler(async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(updatedPackage);
  } catch (err) {
    res.status(500).json({ message: "" });
  }
});
