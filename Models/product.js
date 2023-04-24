const mongoose = require('mongoose');

const ProdSchema = mongoose.Schema({
    company: { type: Number, required: true },
    model: { type: String, unique: true },
    sop: { type: String, required: true },
    eop: { type: String, required: true },
    capacity: { type: String, required: true },
    qte: { type: Number, required: true },
    price: { type: Number, required: true },
    picture: { type: String, default: 'avatar.png' },
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

module.exports = mongoose.model('product', ProdSchema);