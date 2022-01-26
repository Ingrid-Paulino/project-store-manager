// const productModel = require('../models/productsModel');

const productNameValid = async (req, _res, next) => {
  const { name } = req.body;
  // const exitProduct = await productModel.create({ name, quantity });

  if (!name) return { status: 400, message: '"name" is required' };
  if (name.length <= 4) {
    return {
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }

  next();
};

module.exports = productNameValid;
