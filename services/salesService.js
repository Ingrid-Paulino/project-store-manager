const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  console.log('salesServices - itensSold', itensSold);
  return salesModel.create(itensSold); 
};

const getAllsales = async () => salesModel.getAll();

const getIdSales = async (id) => {
  const productId = await salesModel.getById(id);
  // console.log('productId', productId);

  if (!productId.length) return { status: 404, message: 'Sale not found' };
  // ou
  // if (productId.length === 0) return { status: 404, message: 'Sale not found' };

  return productId;
};

const updateSales = async (id, uupdateSales) => {
  // console.log('fgfg', uupdateSales);
  const salesId = await salesModel.getById2(id);

  if (!salesId) return { status: 404, message: 'Sales not found' };
  
  await Promise.all(uupdateSales);
  const update = await salesModel.update(id, uupdateSales);
  
  return update;
}; 

// const removeSales = async (id, uupdateSales) => {
//   const salesId = await salesModel.getById2(id);
//   console.log('response2', salesId);

//   if (!salesId) return { status: 404, message: 'sales not found' };

//   await Promise.all(uupdateSales);
//   const deleta = await salesModel.remove(id, uupdateSales);
//   console.log('ex', deleta);

//   return deleta;
// };

module.exports = {
  create,
  getAllsales,
  getIdSales,
  updateSales,
  // removeSales,
};