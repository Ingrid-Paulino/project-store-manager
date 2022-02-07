const productService = require('../services/productsServices');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createProductValid(name, quantity);

  if ('status' in newProduct) return next(newProduct);

  console.log(newProduct);

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
  const uupdateProduct = { id, ...req.body };
  
  const product = await productService.updateProduct(uupdateProduct);

  if ('status' in product) return next(product);

  return res.status(200).json(product);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  // const { name, quantity } = req.body;
  const exitProduct = await productService.removeProduct(id);

  if ('status' in exitProduct) return next(exitProduct);

  res.status(200).json(exitProduct);
};

module.exports = {
  create,
  getAll,
  getId,
  updateProduct,
  remove,
};