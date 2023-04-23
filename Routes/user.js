const express = require('express');
const UserController = require('../Controllers/user');

const route = express.Router();

route.get('/', UserController.GetAll);

route.get('/:id', UserController.FindById);

route.put('/:id', UserController.Update);

route.delete('/:id', UserController.Delete);

route.post('/register', UserController.Register);

route.post('/login', UserController.Login);

module.exports = route