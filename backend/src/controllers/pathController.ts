import expressAsyncHandler from "express-async-handler";
import Path from "../models/pathModel";

export const addPath = expressAsyncHandler(async (req, res) => {
  const path_data = req.body.slice(0, req.body.length - 2);

  try {
    // path_data without path_data.user
    const savedPath = new Path({path: path_data});
    console.log(path_data)
    await savedPath.save();
    res.status(201).json(savedPath);


  } catch (err) {
    res.status(400).json({ message: "" });
  }
});

export const getPaths = expressAsyncHandler(async (req, res) => {
  try {
    // populate("delivery") then get delivery.package_id
    // const paths = await Path.find().populate("delivery").populate("package_id");
    const paths = await Path.find();
    res.json(paths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
