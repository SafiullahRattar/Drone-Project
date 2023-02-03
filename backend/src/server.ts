import dotenv from 'dotenv'
import connectDB from './config/db'
import bp from 'body-parser'
import express, { Request, Response } from 'express'


const app = express()
dotenv.config()
connectDB()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
