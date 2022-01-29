const productService = require('../services/createServices');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createProductValid(name, quantity);

  if ('status' in newProduct) return next(newProduct);

  res.status(201).json(newProduct);
};

const getAll = async (req, res) => {
  const allProducts = await productService.getAllProducts();

  res.status(200).json(allProducts);
};

const getId = async (req, res, next) => {
  const { id } = req.params;

  const getIdProduct = await productService.getIdProduct(id);

  if ('status' in getIdProduct) return next(getIdProduct);

  res.status(200).json(getIdProduct);
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  // const { name, quantity } = req.body;

  const productId = await productService.getById(id);

  if ('status' in productId) return next(productId);
      
  const newProduct = { ...productId, ...req.body };

  await productService.updateProduct(newProduct);

  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getId,
  updateProduct,
};