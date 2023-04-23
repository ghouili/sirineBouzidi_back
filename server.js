const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const UserController = require('./Routes/user');
const ProductController = require('./Routes/product');

const server = express();
const PORT = 5000;

server.use(bodyparser.json());
server.use(cors({
    origin: '*'
}));

server.use("/uploads/images", express.static(path.join("uploads", "images")));
server.use("/uploads/PDF", express.static(path.join("uploads", "PDF")));

// server.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self' trusted.com");
//     next();
// });

server.get('/', (req, res) => {
    res.send("Hello Farfour!");
});

server.use('/user', UserController);
server.use('/product', ProductController);

mongoose.connect('mongodb+srv://admin:admin@sebntn.aefhueb.mongodb.net/?retryWrites=true&w=majority').then((result) => {
    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
        // console.log(result);
    });
}).catch((err) => {
    console.log(err);
});