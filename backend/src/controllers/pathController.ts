import expressAsyncHandler from "express-async-handler";
import Path from "../models/pathModel";
import Delivery from "../models/deliveryModel";

export const addPath = expressAsyncHandler(async (req, res) => {
  // const path_data = req.body.slice(0, req.body.length - 2);

  delete req.body.user;
  // every from req.body except req.body.user [{}, {}, {}, user: {}]
  const path_data = req.body;

  try {
    // path_data without path_data.user
    const savedPath = new Path({ path: path_data });
    await savedPath.save();
    res.status(201).json(savedPath);
  } catch (err) {
    res.status(400).json({ message: "" });
  }
});

export const getPaths = expressAsyncHandler(async (req, res) => {
  try {
    // Path : {type: [PathModel]}
    // PathModel : {delivery: {type: mongoose.Schema.Types.ObjectId, ref: "Delivery"}, is_home: {type: Boolean, required: true}, }
    // populate("path.delivery") from delivery  populate delivery.package_id
    // const paths = await Path.find().populate("path.delivery").populate("path.drone");
    const paths = await Path.find().populate({
      path: "path.delivery",
      populate: {
        path: "package_id",
        model: "Package",
      },
    }).populate('path.drone');
    console.log(paths);

    res.json(paths);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});
