import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import fs from 'fs';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images from public folder
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Sree Ethnic Finds',
    studioLocation: 'Chalakuzhy, Medical College, Thiruvananthapuram, Kerala',
    phone: '+91 70128 97623',
    version: '1.0.0',
    mode: process.env.NODE_ENV || 'development',
    time: new Date().toISOString()
  });
});

// Serve frontend build if dist exists or in production
const distPath = path.join(rootDir, 'dist');
if (fs.existsSync(distPath) || process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start server after attempting DB connection
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🌸 =============================================== 🌸`);
    console.log(`   SREE ETHNIC FINDS - BOUTIQUE BACKEND RUNNING  `);
    console.log(`   API URL:    http://localhost:${PORT}/api/products`);
    console.log(`   Health:     http://localhost:${PORT}/api/health`);
    console.log(`   Frontend:   http://localhost:3000 (Vite Frontend)`);
    console.log(`   Location:   Chalakuzhy, Trivandrum (+91 70128 97623)`);
    console.log(`🌸 =============================================== 🌸\n`);
  });
};

startServer();
