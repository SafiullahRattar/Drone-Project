import expressAsyncHandler from "express-async-handler";
import { Response, Request } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/generateToken";

export const authUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    console.log(email, password, "FINALLY")

    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }

    res.status(401);
    throw new Error("User not found");
  }
);
