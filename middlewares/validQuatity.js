// const productModel = require('../models/productsModel');

const productQuatityValid = async (req, _res, next) => {
  const { quantity } = req.body;
  // const exitProduct = await productModel.create({ name, quantity });

  if (quantity === undefined) {
    return next({ status: 400, message: '"quantity" is required' });
  }
    
  if (quantity <= 0 || typeof quantity !== 'number') {
      return next({
        status: 422,
        message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  next();
};

module.exports = productQuatityValid;
