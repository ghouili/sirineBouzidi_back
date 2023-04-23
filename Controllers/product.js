const bcrypt = require('bcryptjs');
const product = require('../Models/product');

const GetAll = async (req, res) => {

    let existproducts
    try {
        existproducts = await product.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existproducts });

}

const Create = async (req, res) => {

    const {company,
        model,
        sop,
        eop,
        capacity,
        qte,
        picture,
        userid } = req.body;


    const Newproduct = new product({
        company,
        model,
        sop,
        eop,
        capacity,
        qte,
        picture,
        userid  
    });

    try {
        await Newproduct.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: Newproduct });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existproduct
    try {
        existproduct = await product.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existproduct) {
        return res.status(200).json({ success: false, messgae: 'product doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existproduct });

}

const Update = async (req, res) => {

    const { cin, email, nom, prenom, adress, tel  } = req.body;
    const { id } = req.params;

    let existproduct
    try {
        existproduct = await product.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existproduct) {
        return res.status(200).json({ success: false, messgae: 'product doesnt exist!!', error: false });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    existproduct.cin = cin
    existproduct.email = email
    existproduct.nom = nom
    existproduct.prenom = prenom
    existproduct.adress = adress
    existproduct.tel = tel
    existproduct.password = hashedPassword

    try {
        await existproduct.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existproduct });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existproduct
    try {
        existproduct = await product.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existproduct) {
        return res.status(200).json({ success: false, messge: 'product doesnt exist!!', error: false });
    }

    try {
        await existproduct.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'product Deleted Successfully' });

}

exports.GetAll = GetAll
exports.Create = Create
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete