// const productModel = require('../models/productsModel');

const productQuatityValid = async (req, _res, next) => {
  const { quantity } = req.body;
  // const exitProduct = await productModel.create({ name, quantity });

  if (!quantity) {
    return { status: 400, message: '"name" is required' };
  }
    
  if (quantity.length <= 0 || typeof quantity !== 'number') {
      return {
        status: 422,
        message: '"quantity" must be a number larger than or equal to 1',
    };
  }

  next();
};

module.exports = productQuatityValid;
