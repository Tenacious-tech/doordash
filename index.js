import express from 'express';
import dotenv from 'dotenv';
import deliveryRoute from './routes/deliveryRoute.js';
// import { connectDB } from './config/db.js';
import { login } from './controller/loginController.js';
import authMiddleware from './middlewares/authMiddleware.js';

dotenv.config();

const app=express();

// connectDB();
app.use(express.json());
app.post('/login',login);
app.use('/',authMiddleware,deliveryRoute);

app.listen(3000,()=>{
    console.log("hogaya connect");
})
