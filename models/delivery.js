import mongoose from 'mongoose';

const { Schema } = mongoose;

const deliverySchema = new Schema({
  external_delivery_id: {
    type: String,
    unique: true, // Ensures the 'external_delivery_id' is unique
    required: true,
  },
  pickup_address: {
    type: String,
    required: false,
  },
  pickup_business_name: {
    type: String,
    required: false,
  },
  pickup_phone_number: {
    type: String,
    required: false,
  },
  pickup_instructions: {
    type: String,
    required: false,
  },
  dropoff_address: {
    type: String,
    required: false,
  },
  dropoff_business_name: {
    type: String,
    required: false,
  },
  dropoff_phone_number: {
    type: String,
    required: false,
  },
  dropoff_instructions: {
    type: String,
    required: false,
  },
  order_value: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  fee: {
    type: Number,
    required: false,
  },
  pickup_time_estimated: {
    type: Date,
    required: false,
  },
  dropoff_time_estimated: {
    type: Date,
    required: false,
  },
  pickup_time_actual: {
    type: Date,
    required: false,
  },
  dropoff_time_actual: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date when created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date when created
  },
});

// Automatically update `updatedAt` before saving
deliverySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a Mongoose model based on the schema
const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
