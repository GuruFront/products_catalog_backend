function errorHandler(err, req, res) {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error 1'

  res.status(status).json({
    error: {
      message,
    },
  })
}

module.exports = errorHandler
