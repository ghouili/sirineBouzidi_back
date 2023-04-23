const express = require('express');
const productController = require('../Controllers/product');

const route = express.Router();

route.get('/', productController.GetAll);

route.get('/:id', productController.FindById);

route.put('/:id', productController.Update);

route.delete('/:id', productController.Delete);

route.post('/register', productController.Create);

module.exports = route