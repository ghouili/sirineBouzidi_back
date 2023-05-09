const express = require('express');
const productController = require('../Controllers/product');
const fileuploader = require('../MiddleWare/UploadFiles');


const route = express.Router();

route.get('/', productController.GetAll);

route.get('/:id', productController.FindById);

route.put('/:id', fileuploader.single('picture'), productController.Update);

route.delete('/:id', productController.Delete);

route.post('/add',fileuploader.single('picture'), productController.Create);

module.exports = route