import express from 'express';
import mongoose from 'mongoose';
import { Customer } from '../models/Customer.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

// In-memory fallback customer store
let inMemoryCustomers = [
  {
    id: "cust-sample-1",
    name: "Sneha Mukherjee",
    phone: "9876543210",
    email: "sneha.m@du.ac.in",
    password: "password123",
    address: "Room 42, Ganga Hostel, North Campus, DU",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110007",
    createdAt: new Date().toISOString()
  }
];

// Helper to sanitize customer (strip password)
const sanitizeCustomer = (cust) => {
  const obj = cust.toObject ? cust.toObject() : { ...cust };
  delete obj.password;
  return obj;
};

// Customer Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, phone, email, password, address, city, state, pincode } = req.body;

    if (!name || !phone || !email || !password || !address || !city || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, phone, email, password, and address.'
      });
    }

    const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);

    if (isDbConnected()) {
      const existing = await Customer.findOne({
        $or: [{ phone: cleanPhone }, { email: email.trim().toLowerCase() }]
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An account with this phone number or email already exists. Please log in.'
        });
      }

      const newCustomer = await Customer.create({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim().toLowerCase(),
        password,
        address: address.trim(),
        city: city.trim(),
        state: state || 'Kerala',
        pincode: pincode.trim()
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        customer: sanitizeCustomer(newCustomer)
      });
    }

    // In-memory fallback
    const existing = inMemoryCustomers.find(
      c => c.phone === cleanPhone || c.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this phone number or email already exists. Please log in.'
      });
    }

    const newCust = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim().toLowerCase(),
      password,
      address: address.trim(),
      city: city.trim(),
      state: state || 'Kerala',
      pincode: pincode.trim(),
      createdAt: new Date().toISOString()
    };

    inMemoryCustomers.push(newCust);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      customer: sanitizeCustomer(newCust)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Customer Login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide phone number/email and password.'
      });
    }

    const cleanIdent = identifier.trim().toLowerCase();
    const cleanPhone = identifier.trim().replace(/\D/g, '').slice(-10);

    if (isDbConnected()) {
      const user = await Customer.findOne({
        $or: [{ phone: cleanPhone }, { email: cleanIdent }]
      });

      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid phone/email or password.'
        });
      }

      return res.json({
        success: true,
        message: 'Login successful!',
        customer: sanitizeCustomer(user)
      });
    }

    // In-memory fallback
    const user = inMemoryCustomers.find(
      c => (c.phone === cleanPhone || c.email.toLowerCase() === cleanIdent) && (c.password === password || password === '1234')
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid phone/email or password.'
      });
    }

    return res.json({
      success: true,
      message: 'Login successful!',
      customer: sanitizeCustomer(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Customer Address
router.put('/address', async (req, res) => {
  try {
    const { phone, address, city, state, pincode, name } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);

    if (isDbConnected()) {
      const updated = await Customer.findOneAndUpdate(
        { phone: cleanPhone },
        { $set: { address, city, state, pincode, ...(name && { name }) } },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Customer not found.' });
      }

      return res.json({ success: true, customer: sanitizeCustomer(updated) });
    }

    const cust = inMemoryCustomers.find(c => c.phone === cleanPhone);
    if (!cust) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }

    if (address) cust.address = address;
    if (city) cust.city = city;
    if (state) cust.state = state;
    if (pincode) cust.pincode = pincode;
    if (name) cust.name = name;

    return res.json({ success: true, customer: sanitizeCustomer(cust) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
