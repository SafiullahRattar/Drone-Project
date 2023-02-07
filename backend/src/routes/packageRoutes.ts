import express from "express";
import {
  addPackage,
  getPackageById,
  getPackages,
  updatePackageById,
} from "../controllers/packageController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, adminMiddleware, getPackages)
  .post(authMiddleware, addPackage);

router.route("/:id").get(getPackageById).put(authMiddleware, updatePackageById);

export default router;
