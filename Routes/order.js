const express = require('express');
const orderController = require('../Controllers/order');
const fileuploader = require('../MiddleWare/UploadFiles');


const route = express.Router();

route.get('/', orderController.GetAll);

route.get('/:id', orderController.FindById);

route.put('/:id', orderController.Update);

route.put('/status/:id', orderController.Status);

route.delete('/:id', orderController.Delete);

route.post('/add', orderController.Create);


module.exports = route