const productIdValid = async (req, _res, next) => {
  const sales = req.body;

  // https://www.horadecodar.com.br/2020/11/09/como-verificar-se-uma-chave-existe-em-um-objeto-javascript/
  const salesMap = sales.map((s) => 'product_id' in s);
  console.log('salesMap', salesMap);
  const salesFind = salesMap.find((f) => f === false);
  console.log('salesFind', salesFind);

  if (salesFind === false) {
    return next({ status: 400, message: '"product_id" is required' });
  }
  
  return next();
};

module.exports = productIdValid;