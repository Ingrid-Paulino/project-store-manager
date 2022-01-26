const globalError = (err, _req, res, _next) => {
  if ('status' in err) return res.status(err.status).json({ message: err.message });

  res.status(500).json({ message: 'Internal server error' });
};

module.exports = { globalError };
