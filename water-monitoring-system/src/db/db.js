const { Pool } = require('pg');
require('dotenv').config();

// Log the connection attempt
console.log('Attempting to connect to database:', {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  port: process.env.DB_PORT
  // Not logging password for security
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // For development only
  }
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', {
      code: err.code,
      message: err.message,
      detail: err.detail
    });
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

// Add error handler for pool errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

module.exports = pool;
