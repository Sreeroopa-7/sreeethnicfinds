import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true, default: 'Kerala' },
  pincode: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
