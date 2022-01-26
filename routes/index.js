const express = require('express');

const route = express.Router({ mergeParams: true });

const productRouter = require('./productsRouter');

route.use('/products', productRouter);

module.exports = route;