const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    id_client: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    date: { type: String, required: true },
    note: { type: String },

    adresse: { type: String, required: true },
    etat: { type: Boolean, required: true },
    products: [{
        id: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
        qte: { type: Number, require: true }

    }],

});

module.exports = mongoose.model('order', OrderSchema);