const express = require('express');

const route = express.Router({ mergeParams: true });

const productRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');

route.use('/products', productRouter);
route.use('/sales', salesRouter);

module.exports = route;