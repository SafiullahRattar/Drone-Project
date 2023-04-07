import express from "express";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";
import { addPath, getPaths } from "../controllers/pathController";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, adminMiddleware, getPaths)
  .post(authMiddleware, adminMiddleware, addPath);

export default router;
