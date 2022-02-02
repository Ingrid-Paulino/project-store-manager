const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  console.log('salesServices - itensSold', itensSold);
  return salesModel.create(itensSold); 
};

module.exports = {
  create,
};