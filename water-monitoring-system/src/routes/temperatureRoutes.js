const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get temperature readings for a specific device
router.get('/device/:deviceId', async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const { start_date, end_date } = req.query;

    let query = 'SELECT * FROM temperature_readings WHERE device_id = $1';
    const queryParams = [deviceId];

    if (start_date && end_date) {
      query += ' AND timestamp BETWEEN $2 AND $3';
      queryParams.push(start_date, end_date);
    }

    query += ' ORDER BY timestamp DESC';

    const result = await db.query(query, queryParams);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Add a temperature reading
router.post('/', async (req, res, next) => {
  try {
    const { device_id, temperature, battery_level, rssi } = req.body;
    
    const result = await db.query(
      'INSERT INTO temperature_readings (device_id, timestamp, temperature, battery_level, rssi) VALUES ($1, NOW(), $2, $3, $4) RETURNING *',
      [device_id, temperature, battery_level, rssi]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;