const bcrypt = require('bcryptjs');
const user = require('../Models/user');

const GetAll = async (req, res) => {

    let existUsers
    try {
        existUsers = await user.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existUsers });

}

const Register = async (req, res) => {

    const {cin, email, nom, prenom, adress, tel, password, avatar, role } = req.body;


    let existUser
    try {
        existUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (existUser) {
        return res.status(200).json({ success: false, messgae: 'user Already exist!!', error: false });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = new user({
        cin,
        email,
        nom,
        prenom,
        adress,
        tel,
        password: "secret",
        avatar,
        role: "employer"  
    });

    try {
        await NewUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(201).json({ success: true, message: 'success', data: NewUser });
}

const Login = async (req, res) => {
    //recieve data:
    const { email, password } = req.body;

    //check user if exist:
    let existUser
    try {
        existUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, message: 'user doesnt exist!!', error: false });
    }

    //compare password:
    let check = await bcrypt.compare(password, existUser.password);

    if (!check) {
        return res.status(200).json({ success: false, message: 'Check your password!!', error: false });
    }

    return res.status(200).json({ success: true, message: `Welcome Mr/Mr(s) ${existUser.nom}`, data: existUser });

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, messgae: 'user doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existUser });

}

const Update = async (req, res) => {

    const { cin, email, nom, prenom, adress, tel  } = req.body;
    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, messgae: 'user doesnt exist!!', error: false });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    existUser.cin = cin
    existUser.email = email
    existUser.nom = nom
    existUser.prenom = prenom
    existUser.adress = adress
    existUser.tel = tel
    existUser.password = hashedPassword

    try {
        await existUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existUser });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, messge: 'user doesnt exist!!', error: false });
    }

    try {
        await existUser.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'User Deleted Successfully' });

}

exports.GetAll = GetAll
exports.Register = Register
exports.Login = Login
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete