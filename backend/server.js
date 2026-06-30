const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log(
  "MONGO_URI:",
  process.env.MONGO_URI?.replace(/:(.*?)@/, ":****@")
);

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API running' });
});

// basic error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: 'Something broke on the server' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  })
  .catch((err) => console.log('DB connection error:', err.message));
