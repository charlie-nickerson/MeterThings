const express = require('express');
const cors = require('cors');
const deviceRoutes = require('./src/routes/deviceRoutes');
const temperatureRoutes = require('./src/routes/temperatureRoutes');
const waterRoutes = require('./src/routes/waterRoutes');
const turbidityRoutes = require('./src/routes/turbidityRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/devices', deviceRoutes);
app.use('/api/temperature', temperatureRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/turbidity', turbidityRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});