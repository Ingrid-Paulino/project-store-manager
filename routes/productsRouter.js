const express = require('express'); 
const productValidName = require('../middlewares/validName');
const productValidQuantity = require('../middlewares/validQuatity');
const productController = require('../controllers/productsController');

const productRoute = express.Router({ mergeParams: true });

productRoute.post('/', productValidName, productValidQuantity, productController.create);

productRoute.get('/:id', productController.getId);

productRoute.get('/', productController.getAll);

productRoute.put('/:id', productValidName, productValidQuantity, productController.updateProduct);

productRoute.delete('/:id', productController.remove);

module.exports = productRoute;