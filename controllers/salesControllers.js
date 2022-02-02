const salesService = require('../services/salesService');

const create = async (req, res) => {
  const itemsSold = req.body;
  const response = await salesService.create(itemsSold);
  console.log('response', response);
  return res.status(201).json(response);
};

module.exports = {
  create,
};