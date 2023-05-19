const bcrypt = require('bcryptjs');
const order = require('../Models/order');
const product = require('../Models/product');

const GetAll = async (req, res) => {

    let existorders
    try {
        existorders = await order.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existorders });

}

const Create = async (req, res) => {
    console.log(req.body);
    const {
        id_client,
        date,
        adresse,
        note,
        etat,
        products } = req.body;

    const Neworder = new order({
        id_client,
        date,
        adresse,
        note,
        etat,
        products
    });

    try {
        await Neworder.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: Neworder });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existorder
    try {
        existorder = await order.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existorder) {
        return res.status(200).json({ success: false, messgae: 'order doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existorder });

}

const Status = async (req, res) => {
    const { etat } = req.body;
    const { id } = req.params;

    let existorder
    try {
        existorder = await order.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existorder) {
        return res.status(200).json({ success: false, messgae: 'order doesnt exist!!', error: false });
    }
    
    // let existProd
    // try {
    //     existProd = await product.findById(id);
    // } catch (error) {
    //     return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    // }
    
    // if (!existProd) {
    //     return res.status(200).json({ success: false, messgae: 'Product doesnt exist!!', error: false });
    // }

    existorder.etat = etat;
    // existProd.qte = Number(existProd.qte) - Number(qte);

    // try {
    //     await existProd.save();
    // } catch (error) {
    //     return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    // }
    try {
        await existorder.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: "updated succesfuly", data: existorder });
}

const Update = async (req, res) => {

    const {
        id_client,
        date,
        adresse,
        note,
        etat,
        products } = req.body;


    const { id } = req.params;

    let existorder
    try {
        existorder = await order.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existorder) {
        return res.status(200).json({ success: false, messgae: 'order doesnt exist!!', error: false });
    }


    existorder.etat = etat;
    existorder.products = products;
    existorder.note = note;
    existorder.id_client = id_client;
    existorder.qte = qte;
    existorder.adresse = adresse;


    try {
        await existorder.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existorder });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existorder
    try {
        existorder = await order.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existorder) {
        return res.status(200).json({ success: false, messge: 'order doesnt exist!!', error: false });
    }



    try {
        await existorder.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'order Deleted Successfully' });

}

exports.GetAll = GetAll
exports.Create = Create
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete
exports.Status = Status