const productModel = require('../models/productsModel');

const createProductValid = async (name, quantity) => {
  const exitProduct = await productModel.getByName(name);
  if (exitProduct) return { status: 409, message: 'Product already exists' };

  return productModel.create(name, quantity); 
};

const getAllProducts = async () => productModel.getAll();

const getIdProduct = async (id) => {
  const productId = await productModel.getById(id);

  if (!productId) return { status: 404, message: 'Product not found' };
  return productId;
};

const updateProduct = async (id, name, quantity) => {
  const productId = await productModel.getById(id);

  if (!productId) return { status: 409, message: 'Product already exists' };

  return productModel.update(id, name, quantity);
};

const removeProduct = async (id) => {
  const exitProduct = await productModel.remove(id);
  if (!exitProduct) return { status: 404, message: 'Product not found' };
};

module.exports = {
  createProductValid,
  getAllProducts,
  getIdProduct,
  updateProduct,
  removeProduct,
};
