const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}
connectDB();

// 🔐 Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 📝 Task Routes (✅ ADDED THIS)
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
