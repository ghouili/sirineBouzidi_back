const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const UserController = require('./Routes/user');
const ProductController = require('./Routes/product');
const OrderCtController = require('./Routes/order');

const server = express();
const PORT = 5000;

server.use(bodyparser.json());
server.use(cors());

server.use("/uploads/images", express.static(path.join("uploads", "images")));
server.use("/uploads/PDF", express.static(path.join("uploads", "PDF")));

// server.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self' trusted.com");
//     next();
// });

server.get('/', (req, res) => {
    res.send("Hello world!");
});

server.use('/user', UserController);
server.use('/product', ProductController);
server.use('/order', OrderCtController);

// mongoose.connect('mongodb+srv://admin:admin@sebntn.aefhueb.mongodb.net/?retryWrites=true&w=majority').then((result) => {
mongoose.connect('mongodb+srv://sirine:sirine@cluster0.4zteiwa.mongodb.net/?retryWrites=true&w=majority').then((result) => {
    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
        // console.log(result);
    });
}).catch((err) => {
    console.log(err);
});