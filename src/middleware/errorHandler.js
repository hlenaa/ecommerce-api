const errorHandler = (err, req, res, next) => {
    process.env.NODE_ENV !== "production" && console.error(err.stack); // log the error stack if not in production
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  };
  
  export default errorHandler;