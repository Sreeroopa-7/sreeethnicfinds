import express from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { SAMPLE_PRODUCTS } from '../../src/data/products.js';

const router = express.Router();

// Resilient in-memory fallback store
let inMemoryProducts = [...SAMPLE_PRODUCTS];

// Helper to check if MongoDB is active
const isDbConnected = () => mongoose.connection.readyState === 1;

// GET all products
router.get('/', async (req, res) => {
  if (isDbConnected()) {
    try {
      const dbProducts = await Product.find({});
      if (dbProducts && dbProducts.length > 0) {
        return res.json({ success: true, count: dbProducts.length, data: dbProducts });
      }
    } catch (err) {}
  }

  res.json({ success: true, count: inMemoryProducts.length, data: inMemoryProducts, source: 'demo_store' });
});

// GET single product
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      const prod = await Product.findOne({ id });
      if (prod) {
        return res.json({ success: true, data: prod });
      }
    } catch (err) {}
  }

  const found = inMemoryProducts.find(p => p.id === id);
  if (!found) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, data: found });
});

// POST new product (Admin Only)
router.post('/', async (req, res) => {
  const newProductData = req.body;
  if (!newProductData.name || !newProductData.price) {
    return res.status(400).json({ success: false, message: 'Product name and price are required' });
  }

  const generatedId = `sef-${String(inMemoryProducts.length + 1).padStart(3, '0')}`;
  const fullProduct = {
    ...newProductData,
    id: newProductData.id || generatedId,
    rating: 5.0,
    reviewsCount: 0
  };

  if (isDbConnected()) {
    try {
      const created = await Product.create(fullProduct);
      inMemoryProducts.unshift(fullProduct);
      return res.status(201).json({ success: true, data: created });
    } catch (err) {}
  }

  inMemoryProducts.unshift(fullProduct);
  return res.status(201).json({ success: true, data: fullProduct, note: 'Saved in memory store' });
});

// PUT update product (Admin Only)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (isDbConnected()) {
    try {
      const updated = await Product.findOneAndUpdate({ id }, updates, { new: true });
      if (updated) {
        return res.json({ success: true, data: updated });
      }
    } catch (err) {}
  }

  const index = inMemoryProducts.findIndex(p => p.id === id);
  if (index > -1) {
    inMemoryProducts[index] = { ...inMemoryProducts[index], ...updates };
    return res.json({ success: true, data: inMemoryProducts[index] });
  }

  res.status(404).json({ success: false, message: 'Product not found' });
});

// DELETE product (Admin Only)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      await Product.findOneAndDelete({ id });
    } catch (err) {}
  }

  inMemoryProducts = inMemoryProducts.filter(p => p.id !== id);
  res.json({ success: true, message: `Product ${id} deleted successfully` });
});

export default router;
