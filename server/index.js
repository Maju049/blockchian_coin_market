import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Enable CORS for frontend client routing
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Server health check route
app.get('/', (req, res) => {
  res.json({ status: 'active', message: 'ASIC Miner Market backend' });
});

// Launch server
app.listen(PORT, () => {
  console.log(`🚀 ASIC Miner Market backend listening at http://localhost:${PORT}`);
});

