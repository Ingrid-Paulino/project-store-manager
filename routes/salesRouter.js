const express = require('express'); 

const validProductId = require('../middlewares/ValidProductId');
const validQuantitySales = require('../middlewares/validQuantitySales');
const salesController = require('../controllers/salesControllers');

const salesRoute = express.Router({ mergeParams: true });

salesRoute.post('/', validProductId, validQuantitySales, salesController.create);

salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.getId);

module.exports = salesRoute;