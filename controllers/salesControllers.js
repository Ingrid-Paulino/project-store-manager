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

const updateSales = async (req, res, next) => {
  const { id } = req.params;
  // const { name, quantity } = req.body;
  // const uupdateSales = { id, ...req.body };
  
  const service = await salesService.updateSales(id, req.body);

  if ('status' in service) return next(service);

  return res.status(200).json(service);
};

// const remove = async (req, res, next) => {
//   const { id } = req.params;
//   // const { name, quantity } = req.body;
//   const exitsales = await salesService.removeSales(id, req.body);

//   console.log('response1', id, req.body);

//   if ('status' in exitsales) return next(exitsales);

//   res.status(200).json(exitsales);
// };

module.exports = {
  create,
  getAll,
  getId,
  updateSales,
  // remove,
};