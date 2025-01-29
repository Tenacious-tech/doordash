import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
dotenv.config();

const data = {
  aud: 'doordash',
  iss: process.env.DEVELOPER_ID,
  kid: process.env.KEY_ID,
  exp: Math.floor(Date.now() / 1000 + 300),
  iat: Math.floor(Date.now() / 1000),
}

const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } }

const token = jwt.sign(
  data,
  Buffer.from(process.env.SIGNING_SECRET, 'base64'),
  headers,
)

// create delivery
export const createDelivery= async(req,res)=>{
      const reqBody =req.body;

      const body = JSON.stringify({
        external_delivery_id: reqBody.external_delivery_id,
        pickup_address: reqBody.pickup_address,
        pickup_business_name: reqBody.pickup_business_name,
        pickup_phone_number: reqBody.pickup_phone_number,
        pickup_instructions: reqBody.pickup_instructions,
        dropoff_address: reqBody.dropoff_address,
        dropoff_business_name: reqBody.dropoff_business_name,
        dropoff_phone_number: reqBody.dropoff_phone_number,
        dropoff_instructions: reqBody.dropoff_instructions,
        order_value: reqBody.order_value,
      });

     const response= await axios.post('https://openapi.doordash.com/drive/v2/deliveries', body, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const insertQuery=`INSERT INTO delivery (external_delivery_id, pickup_address, pickup_business_name, pickup_phone_number, pickup_instructions,dropoff_address, dropoff_business_name,dropoff_phone_number,dropoff_instructions,order_value,status) VALUES (?, ?, ?,?,?,?,?,?,?,?,?)`;
      const values=[reqBody.external_delivery_id,reqBody.pickup_address,reqBody.pickup_business_name,reqBody.pickup_phone_number,reqBody.pickup_instructions,reqBody.dropoff_address,reqBody.dropoff_business_name,reqBody.dropoff_phone_number,reqBody.dropoff_instructions,reqBody.order_value,response.data.delivery_status];
      const DB= await connectDB();
      await DB.execute(insertQuery,values);
      console.log("krdiya data add");
      await DB.end();

    return res.json({data : response.data});
}

// Status function
export const getStatus = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await axios.get(`https://openapi.doordash.com/drive/v2/deliveries/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return res.json({ data: response.data });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching status', details: error.message });
  }
};

// create Quote
export const createQuote = async(req,res)=>{
  const reqBody =req.body;

  const body = JSON.stringify({
    external_delivery_id: reqBody.external_delivery_id,
    pickup_address: reqBody.pickup_address,
    pickup_business_name: reqBody.pickup_business_name,
    pickup_phone_number: reqBody.pickup_phone_number,
    pickup_instructions: reqBody.pickup_instructions,
    dropoff_address: reqBody.dropoff_address,
    dropoff_business_name: reqBody.dropoff_business_name,
    dropoff_phone_number: reqBody.dropoff_phone_number,
    dropoff_instructions: reqBody.dropoff_instructions,
    order_value: reqBody.order_value,
    delivery_status: reqBody.delivery_status,
    pickup_time_estimated: reqBody.pickup_time_estimated,
    dropoff_time_estimated: reqBody.dropoff_time_estimated,
    fee: reqBody.fee,
  });

  const response =await axios.post(`https://openapi.doordash.com/drive/v2/quotes`,body,{
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  const insertQuery=`INSERT INTO delivery (external_delivery_id, pickup_address, pickup_business_name, pickup_phone_number, pickup_instructions,dropoff_address, dropoff_business_name,dropoff_phone_number,dropoff_instructions,order_value,status) VALUES (?, ?, ?,?,?,?,?,?,?,?,?)`;
  const values=[reqBody.external_delivery_id,reqBody.pickup_address,reqBody.pickup_business_name,reqBody.pickup_phone_number,reqBody.pickup_instructions,reqBody.dropoff_address,reqBody.dropoff_business_name,reqBody.dropoff_phone_number,reqBody.dropoff_instructions,reqBody.order_value,response.data.delivery_status];
  
      const DB= await connectDB();
      await DB.execute(insertQuery,values);
      console.log("krdiya data add");
      await DB.end();
  return res.json({data : response.data});
}

// Accept Quote
export const acceptQuote = async(req,res)=>{
  const {id}= req.query;
  const reqBody= req.body;

  const body = JSON.stringify({
    tip: reqBody.tip
  });

  const response=await axios.post(`https://openapi.doordash.com/drive/v2/quotes/${id}/accept`,body,{
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
      const insertQuery= `UPDATE delivery SET status=created WHERE external_delivery_id=${id}`;
      const DB= await connectDB();
      await DB.execute(insertQuery);
      console.log("krdiya data add");
      await DB.end();
  return res.json({data: response.data});
}


// cancel function
export const cancelDelivery = async (req,res)=>{
  const {id}=req.query;
  const reqBody=req.body;

  try {
    const response = await axios.put(`https://openapi.doordash.com/drive/v2/deliveries/${id}/cancel`,reqBody, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const insertQuery= `UPDATE delivery SET status=cancelled WHERE external_delivery_id=${id}`;
      const DB= await connectDB();
      await DB.execute(insertQuery);
      console.log("krdiya data add");
      await DB.end();
    return res.json({data : response.data});
  }catch(err){
    return res.json(err);
  }
}

