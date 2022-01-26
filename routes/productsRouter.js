const express = require('express'); 
const productValidName = require('../middlewares/validName');
const productValidQuantity = require('../middlewares/validQuatity');
const productCreateController = require('../controllers/createController');

const productRoute = express.Router({ mergeParams: true });

productRoute.post('/', productValidName, productValidQuantity, productCreateController.create);

module.exports = productRoute;