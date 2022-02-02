const salesQuatityValid = async (req, _res, next) => {
  const sales = req.body;

  const salesMap = sales.map((s) => 'quantity' in s);

  const salesFind = salesMap.find((f) => f === false);

  if (salesFind === false) {
    return next({ status: 400, message: '"quantity" is required' });
  }

  const numMaiorQ0 = sales.some((num) => num.quantity <= 0 || typeof num.quantity !== 'number');
  console.log(numMaiorQ0);
    
  if (numMaiorQ0) {
      return next({
        status: 422,
        message: '"quantity" must be a number larger than or equal to 1',
    });
  }
  return next();
};

module.exports = salesQuatityValid;
