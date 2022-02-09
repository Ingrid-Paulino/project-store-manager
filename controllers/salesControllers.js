const salesService = require('../services/salesService');

const create = async (req, res) => {
  const itemsSold = req.body;
  // console.log('item', itemsSold);
  const response = await salesService.create(itemsSold);

  // await salesService.getLastSale(response);
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

const updateSales = async (req, res, next) => {
  const { id } = req.params;
  // const { name, quantity } = req.body;
  // const uupdateSales = { id, ...req.body };
  
  const service = await salesService.updateSales(id, req.body);

  if ('status' in service) return next(service);

  return res.status(200).json(service);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  // const { name, quantity } = req.body;
  // console.log('req.body', req.body);
  const deleteSales = await salesService.remove(id);

  if ('status' in deleteSales) return next(deleteSales);

  res.status(200).json(deleteSales);
};

module.exports = {
  create,
  getAll,
  getId,
  updateSales,
  remove,
};