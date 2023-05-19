const bcrypt = require('bcryptjs');
const user = require('../Models/user');
const fs = require('fs');
const generator = require('generate-password');

const nodemailer = require("nodemailer");



const GetAll = async (req, res) => {

    let existUsers
    try {
        existUsers = await user.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existUsers });

}

const Add = async (req, res) => {

    const { cin, email, nom, prenom, adress, tel, role } = req.body;

    let avatar = 'avatar.png';
    if (req.file) {
        avatar = req.file.filename;
    }

    let existUser
    try {
        existUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (existUser) {
        return res.status(200).json({ success: false, message: 'user Already exist!!', error: false });
    }

    let password = 'secret';
    // let password = generator.generate({
    //     length: 8,
    //     numbers: true
    // });

    const NewUser = new user({
        cin,
        email,
        nom,
        prenom,
        adress,
        tel,
        password,
        avatar,
        role
    });

    try {
        await NewUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    // let testAccount = await nodemailer.createTestAccount();
    

    var transporter = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        service: "gmail",
        // port: 2525,
        auth: {
            user: "sebntn.contact@gmail.com",
            pass: "joucivcesyymsnjd"
        }
    });

    let info = await transporter.sendMail({
        from: 'sebntn.contact@gmail.com', // sender address
        to: email, // list of receivers
        subject: "New Account Created", // Subject line
        // text: "Hello world?", // plain text body
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 20px;">
            <h1 style="text-align: center; color: #3d3d3d; margin-bottom: 40px;">Welcome to Our App!</h1>
            <p style="font-size: 18px; color: #3d3d3d;">Dear ${nom} ${prenom},</p>
            <p style="font-size: 18px; color: #3d3d3d;">Your new account has been successfully created in our App as a(n) <strong>${role}</strong>.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Please keep your password in a safe place. You can change your password anytime by logging into your account.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Here is your password: <strong>${password}</strong></p>
            <div style="text-align: center; margin-top: 40px;">
                <a href="https://www.google.com/" style="display: inline-block; background-color: #0066ff; color: white; font-size: 18px; padding: 12px 30px; text-decoration: none; border-radius: 30px;">Check out our App</a>
            </div>
            <p style="font-size: 16px; color: #666; margin-top: 40px;">Thank you for using our App!</p>
        </div>
    </div>
        `, // html body
    });
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return res.status(201).json({ success: true, message: 'success', data: NewUser });
}

const Register = async (req, res) => {

    const { cin, email, nom, prenom, adress, tel, password, avatar, role } = req.body;


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

    const { nom, prenom, adress, tel } = req.body;
    const { id } = req.params;

    // console.log(req.body);

    let existUser
    try {
        existUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existUser) {
        return res.status(200).json({ success: false, messgae: 'user doesnt exist!!', error: false });
    }

    let hashedPassword;
    if (req.body.oldpassword) {
        //compare password:
        let check = await bcrypt.compare(req.body.oldpassword, existUser.password);

        if (!check) {
            return res.status(200).json({ success: false, message: 'the old password is incorrect!!', error: false });
        }
        if (!req.body.newpassword) {
            return res.status(200).json({ success: false, message: 'the new password is missing!!', error: false });
        }
        const salt = await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(req.body.newpassword, salt);
        existUser.password = hashedPassword;
    }
    
    if (req.file) {
        let path = `./uploads/images/${existUser.avatar}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
        existUser.avatar = req.file.filename;
    }

    if (req.body.role) {

        existUser.role = req.body.role;
    }
    if (req.body.email) {

        existUser.role = req.body.email;
    }
    if (req.body.cin) {

        existUser.role = req.body.cin;
    }
    existUser.nom = nom;
    existUser.prenom = prenom;
    existUser.adress = adress;
    existUser.tel = tel;
    

    try {
        await existUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
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

    if (req.file) {
        let path = `./uploads/images/${existUser.avatar}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
    }

    try {
        await existUser.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'User Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.Register = Register
exports.Login = Login
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete