const productService = require('../services/createServices');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createProductValid(name, quantity);

  if ('status' in newProduct) return next(newProduct);

  res.status(201).json(newProduct);
};

module.exports = {
  create,
};