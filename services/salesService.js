const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  console.log('salesServices - itensSold', itensSold);
  return salesModel.create(itensSold); 
};

const getAllsales = async () => salesModel.getAll();
 
const getIdSales = async (id) => {
  const productId = await salesModel.getById(id);

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

const remove = async (id) => {
  const salesId = await salesModel.getById(id);
  console.log('salesId1', salesId);

  if (!salesId.length) return { status: 404, message: 'Sale not found' };
  console.log('salesId2', salesId);
  
  await salesId.map(async (item) => {
    console.log('item', item);
    await salesModel.remove(id, item);
  });
   
  console.log('salesId', salesId);
  return salesId;
};

module.exports = {
  create,
  getAllsales,
  getIdSales,
  updateSales,
  remove,
};