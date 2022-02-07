// const productModel = require('../models/productsModel');

const productNameValid = async (req, _res, next) => {
  const { name } = req.body;
  // const exitProduct = await productModel.create({ name, quantity });
  // console.log(name);

  if (!name) return next({ status: 400, message: '"name" is required' });
  if (name.length <= 4) {
    return next({
      status: 422,
      message: '"name" length must be at least 5 characters long',
    });
  }

  next();
};

module.exports = productNameValid;
