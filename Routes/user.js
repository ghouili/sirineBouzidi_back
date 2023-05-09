const express = require('express');
const UserController = require('../Controllers/user');
const fileuploader = require('../MiddleWare/UploadFiles');

const route = express.Router();

route.get('/', UserController.GetAll);

route.get('/:id', UserController.FindById);

route.put('/:id',fileuploader.single('avatar'), UserController.Update);

route.delete('/:id', UserController.Delete);

route.post('/register', UserController.Register);

route.post('/login', UserController.Login);

route.post('/add', fileuploader.single('avatar'), UserController.Add);

module.exports = route