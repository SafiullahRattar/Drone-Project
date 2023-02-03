"use strict";
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import authRoutes from './routes/auth.route';
// import pickupRoutes from './routes/pickup.route';
// import storageRoutes from './routes/storage.route';
// import dronesRoutes from './routes/drones.route';
// import locationRoutes from './routes/location.route';
// import adminRoutes from './routes/admin.route';
// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// const PORT = process.env.PORT || 4000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/drone_delivery';
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch(err => {
//         console.log('Error connecting to MongoDB: ', err);
//     });
// app.use('/api/auth', authRoutes);
// app.use('/api/pickup', pickupRoutes);
// app.use('/api/storage', storageRoutes);
// app.use('/api/drones', dronesRoutes);
// app.use('/api/location', locationRoutes);
// app.use('/api/admin', adminRoutes);
// app.listen(PORT, () => {
//     console.log(`Server is running on PORT ${PORT}`);
// });
// export default app;
