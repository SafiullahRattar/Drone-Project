import dotenv from "dotenv";
import connectDB from "./config/db";
import bp from "body-parser";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

const app = express();
dotenv.config();
connectDB();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);



app.use("/hello", (req, res) => {
    res.send('hello world')
});
// app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
