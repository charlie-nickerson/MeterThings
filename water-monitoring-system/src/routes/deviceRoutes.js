const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all devices
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM devices ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Get a specific device
router.get('/:deviceId', async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const result = await db.query('SELECT * FROM devices WHERE device_id = $1', [deviceId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// Add a new device
router.post('/', async (req, res, next) => {
  try {
    const { device_id, location } = req.body;
    
    const result = await db.query(
      'INSERT INTO devices (device_id, location, installation_date) VALUES ($1, $2, NOW()) RETURNING *',
      [device_id, location]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// Update a device
router.put('/:deviceId', async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const { location, status } = req.body;
    
    const result = await db.query(
      'UPDATE devices SET location = $1, status = $2, updated_at = NOW() WHERE device_id = $3 RETURNING *',
      [location, status, deviceId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;