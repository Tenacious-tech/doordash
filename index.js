import express from 'express';
import dotenv from 'dotenv';
import deliveryRoute from './routes/deliveryRoute.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app=express();

connectDB();
app.use(express.json());
app.use('/',deliveryRoute);

app.listen(3000,()=>{
    console.log("hogaya connect");
})