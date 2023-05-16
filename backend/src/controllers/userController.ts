import expressAsyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/generateToken";

export const authUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, name } = (req.user as any)._json;
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
    if (process.env.NODE_ENV === "production") {
      res.redirect(`${process.env.SERVER_URL}/signUp?jwt=${jwt}`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/signUp?jwt=${jwt}`);
    }
    // res.redirect(`http://localhost:5000/signUp?jwt=${jwt}`);
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
      isRegistered: user.isRegistered,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc   Fetch all users
 * @route  GET /api/admin/users
 * @access Private/Admin
 */
export const getAllUsers_Admin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find({});
    res.json(users);
  }
);

/**
 * @desc   Update user
 * @route  PUT /api/admin/users/:id
 * @access Private/Admin
 */
export const updateUser_Admin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

/**
 * @desc   Delete user
 * @route  DELETE /api/admin/users/:id
 * @access Private/Admin
 */
export const deleteUser_Admin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);
