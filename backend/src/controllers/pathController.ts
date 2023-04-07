import expressAsyncHandler from "express-async-handler";
import Path from "../models/pathModel";

export const addPath = expressAsyncHandler(async (req, res) => {
  const path_data = req.body;

  try {
    const savedPath = await Path.create(path_data);
    res.status(201).json(savedPath);
  } catch (err) {
    res.status(400).json({ message: "" });
  }
});

export const getPaths = expressAsyncHandler(async (req, res) => {
  try {
    const paths = await Path.find();
    res.json(paths);
  } catch (err) {
    res.status(500).json({ message: "" });
  }
});
