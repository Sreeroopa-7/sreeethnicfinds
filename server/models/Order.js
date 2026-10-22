import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String }
}, { _id: false });

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: { type: CustomerSchema, required: true },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery (COD)' },
  status: {
    type: String,
    enum: [
      'Pending',
      'Confirmed',
      'Shipped',
      'Delivered',
      'Cancelled',
      'Returned'
    ],
    default: 'Confirmed'
  },
  trackingCourier: { type: String, default: 'India Post Speed Post' },
  trackingAwb: { type: String, default: 'Pending' },
  shippedAt: { type: Date },
  deliveredAt: { type: Date },
  notes: { type: String, default: '' }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
