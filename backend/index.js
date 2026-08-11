require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Robust CORS Middleware for Render & Frontend Domains
const corsOptions = {
  origin: true, // Accepts requests from all origins (or reflects request origin)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', mediaRoutes);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('BotMate Neural Cloud API is Online! 🦖');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
