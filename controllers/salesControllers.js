const salesService = require('../services/salesService');

const create = async (req, res) => {
  const itemsSold = req.body;
  const response = await salesService.create(itemsSold);
  // console.log('response', response);
  return res.status(201).json(response);
};

const getAll = async (req, res) => {
  const allsales = await salesService.getAllsales();

  return res.status(200).json(allsales);
};

const getId = async (req, res, next) => {
  const { id } = req.params;
  const getIdSales = await salesService.getIdSales(id);
  if ('status' in getIdSales) return next(getIdSales);
  res.status(200).json(getIdSales);
};

module.exports = {
  create,
  getAll,
  getId,
};