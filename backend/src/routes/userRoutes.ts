import express from "express";
import passport from "passport";
import { authUser } from "../controllers/userController";
import { generateToken } from "../utils/generateToken";
// // import { authUser, deleteUserAsAdmin, getUserByIdAsAdmin, getUserProfile, getUsersAsAdmin, registerUesr, updateUserAsAdmin } from '../controllers/userController'
// import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// router.route("/");

//Route for Google Authorization
router.get("/login/success", (req, res) => {
  if (req.user) {
      console.log(req.user)
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    //   token: generateToken(req.user.id),
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });
router.get('/', (req, res) => {
  console.log('hello there')
})
// router.post("/login", authUser);

// router.route("/profile");

export default router;
