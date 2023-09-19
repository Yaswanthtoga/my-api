const uuid = require('uuid');

module.exports = function errorHandler(err, req, res,next) {
    
    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      return res.status(400).json({
        success: false,
        error: err.message,
        data:{
            id:uuid.v4()
        }
      });
    }else if (err.name === 'AreaNotFoundError'){
      return res.status(404).json({
        success: false,
        error: err.message,
        data:{
            id:uuid.v4()
        }
      });
    }else if(err.name === 'NotSufficientDataError'){
      return res.status(422).json({
        success: false,
        error: err.message,
        data:{
            id:uuid.v4()
        }
      });
    }
    return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        data:{
            id:uuid.v4()
        }
    });
  };
  