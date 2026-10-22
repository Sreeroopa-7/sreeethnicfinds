import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  tag: { type: String },
  price: { type: Number, required: true }, // Retail price (₹299 - ₹499)
  originalPrice: { type: Number, required: true },
  discount: { type: String, default: '50% OFF' },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 0 },
  images: [{ type: String }],
  sizes: [{ type: String }],
  colors: [{
    name: String,
    hex: String,
    inStock: { type: Boolean, default: true }
  }],
  fabric: { type: String, required: true },
  weave: { type: String },
  length: { type: String },
  sleeves: { type: String },
  neckline: { type: String },
  fit: { type: String, default: 'Regular' },
  pocket: { type: String },
  washCare: { type: String },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 20 },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });

ProductSchema.methods.toPublicJSON = function () {
  return this.toObject();
};

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
