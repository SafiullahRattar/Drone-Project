import expressAsyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/generateToken";

export const authUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, name } = req.user?._json;
    let user;
    user = await User.findOne({ email }).select("-password");
    if (!user) {
      console.log("ADDING NEW USER");

      user = await User.create({
        name,
        email,
        isAdmin: false,
      });
    }

    const jwt = generateToken(user._id);
    // console.log(req.user);
    res.cookie("JWT", jwt);
    res.redirect(process.env.CLIENT_URL!);
  }
);

export const getUserProfile = expressAsyncHandler(async (req, res) => {
  // res.send('Success')
  const user = await User.findById(req.body.user._id);

  // console.log('made it');
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
