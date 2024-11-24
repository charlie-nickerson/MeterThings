const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.code === '23505') { // Unique violation
      return res.status(409).json({
        error: 'Resource already exists'
      });
    }
    
    if (err.code === '23503') { // Foreign key violation
      return res.status(400).json({
        error: 'Invalid reference'
      });
    }
    
    res.status(500).json({
      error: 'Internal server error'
    });
  };
  
  module.exports = errorHandler;