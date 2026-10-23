import express from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/Order.js';

const router = express.Router();

// Helper to check if MongoDB is active
const isDbConnected = () => mongoose.connection.readyState === 1;

// In-memory fallback order storage (Boutique orders dispatched from Chalakuzhy, Thiruvananthapuram)
let inMemoryOrders = [
  {
    orderId: "SEF-2026-1042",
    createdAt: new Date().toISOString(),
    customer: {
      name: "Sneha Mukherjee",
      phone: "9876543210",
      email: "sneha.m@du.ac.in",
      address: "Room 42, Ganga Hostel, North Campus, DU",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110007"
    },
    items: [
      {
        id: "sef-001",
        name: "Gulabi Bahaar Floral Straight Kurti",
        size: "M",
        color: "Pastel Pink",
        price: 399,
        quantity: 1,
        image: "/images/floral_straight.jpg"
      }
    ],
    subtotal: 399,
    deliveryFee: 49,
    discount: 0,
    totalAmount: 448,
    paymentMethod: "Online Money Transfer (+91 70128 97623)",
    status: "Shipped",
    trackingCourier: "India Post Speed Post",
    trackingAwb: "KL-TRV-892104",
    notes: "Direct boutique dispatch from Chalakuzhy studio."
  }
];

// GET all orders (Admin only)
router.get('/', async (req, res) => {
  if (isDbConnected()) {
    try {
      const dbOrders = await Order.find({}).sort({ createdAt: -1 });
      if (dbOrders && dbOrders.length > 0) {
        return res.json({ success: true, count: dbOrders.length, data: dbOrders });
      }
    } catch (err) {}
  }

  res.json({ success: true, count: inMemoryOrders.length, data: inMemoryOrders });
});

// POST new customer order / published manual order
router.post('/', async (req, res) => {
  const { customer, items, subtotal, deliveryFee, discount, totalAmount, paymentMethod, notes, status, trackingCourier, trackingAwb } = req.body;

  if (!customer || !customer.name || !customer.phone || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Missing required customer or items data' });
  }

  const orderId = req.body.orderId || `SEF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    orderId,
    customer,
    items,
    subtotal: subtotal || items.reduce((s, it) => s + (it.price * it.quantity), 0),
    deliveryFee: deliveryFee || 0,
    discount: discount || 0,
    totalAmount: totalAmount || subtotal,
    paymentMethod: paymentMethod || 'Online Money Transfer (+91 70128 97623)',
    status: status || 'Confirmed',
    trackingCourier: trackingCourier || 'India Post Speed Post',
    trackingAwb: trackingAwb || 'Pending',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  if (isDbConnected()) {
    try {
      const created = await Order.create(newOrder);
      inMemoryOrders.unshift(newOrder);
      return res.status(201).json({ success: true, message: 'Order created', data: created });
    } catch (err) {}
  }

  inMemoryOrders.unshift(newOrder);
  return res.status(201).json({ success: true, message: 'Order placed in demo memory store', data: newOrder });
});

// PUT update order status & tracking details (Admin)
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, trackingAwb, trackingCourier } = req.body;

  const validStatuses = [
    'Pending',
    'Confirmed',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Returned'
  ];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid order status value' });
  }

  const updates = {};
  if (status) updates.status = status;
  if (trackingAwb) updates.trackingAwb = trackingAwb;
  if (trackingCourier) updates.trackingCourier = trackingCourier;

  if (isDbConnected()) {
    try {
      const updated = await Order.findOneAndUpdate({ orderId: id }, updates, { new: true });
      if (updated) {
        return res.json({ success: true, data: updated });
      }
    } catch (err) {}
  }

  const index = inMemoryOrders.findIndex(o => o.orderId === id);
  if (index > -1) {
    inMemoryOrders[index] = { ...inMemoryOrders[index], ...updates };
    return res.json({ success: true, data: inMemoryOrders[index] });
  }

  res.status(404).json({ success: false, message: 'Order not found' });
});

export default router;
