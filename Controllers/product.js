const bcrypt = require('bcryptjs');
const product = require('../Models/product');
const fs = require('fs')

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

    const { company,
        model,
        sop,
        eop,
        capacity,
        qte,
        price,
        userid } = req.body;

    let picture = 'avatar.png';
    if (req.file) {
        picture = req.file.filename;
    }

    const Newproduct = new product({
        company,
        model,
        sop,
        eop,
        capacity,
        qte,
        price,
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

const UpdateStock = async (req, res) => {

    const { stock } = req.body;
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

    existproduct.qte = Number(existproduct.qte) + Number(stock);

    try {
        await existproduct.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existproduct });
}

const Update = async (req, res) => {

    const { company,
        model,
        sop,
        eop,
        capacity,
        qte,
        price,

        userid } = req.body;
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

    if (req.file) {
        let path = `./uploads/images/${existproduct.picture}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
        existproduct.picture = req.file.filename;
    }


    existproduct.company = company;
    existproduct.model = model;
    existproduct.sop = sop;
    existproduct.eop = eop;
    existproduct.capacity = capacity;
    existproduct.qte = qte;
    existproduct.price = price;
    existproduct.userid = userid;

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

    let path = `./uploads/images/${existproduct.picture}`;
    try {
        fs.unlinkSync(path)
        //file removed
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error, error: error })
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
exports.UpdateStock = UpdateStock
exports.Delete = Delete