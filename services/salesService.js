const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  console.log('salesServices - itensSold', itensSold);
  return salesModel.create(itensSold); 
};

const getAllsales = async () => salesModel.getAll();

const getIdSales = async (id) => {
  const productId = await salesModel.getById(id);
  console.log('productId', productId);

  if (!productId.length) return { status: 404, message: 'Sale not found' };
  // ou
  // if (productId.length === 0) return { status: 404, message: 'Sale not found' };

  return productId;
};

module.exports = {
  create,
  getAllsales,
  getIdSales,
};