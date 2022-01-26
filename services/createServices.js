const productModel = require('../models/productsModel');

const createProductValid = async (name, quantity) => {
  const exitProduct = await productModel.getByName(name);
  if (exitProduct) return { status: 409, message: 'Product already exists' };

  return productModel.create(name, quantity); 
};

module.exports = {
  createProductValid,
};
