// import mysql from 'mysql2/promise';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB=async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect hogaya database");
}


// export const connectDB= async()=>{
// try{
//    const DB = await mysql.createConnection({
//     host: 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
// });
//     console.log('database bhi hogaya connect');
//     return DB;
// }catch(err){
//     console.log(err);
//     console.log('nhi huva connect database');
// }
// }





