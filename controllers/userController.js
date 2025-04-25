const { errorMonitor } = require('nodemailer/lib/xoauth2');
const userModel = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please provide all fields"})
    }

    try{
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }

        const user = await userModel.create({email,password});

        res.status(200).json
        ({_id:user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    }catch(err){
        res.status(500).json({message:"Server Error : ", error: err.message})
    }
};

exports.loginUser = async(req,res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please provide all fields"})
    }

    try{
        const userExists = await userModel.findOne({email});
    
        if(userExists && (await userExists.matchPassword(password))){
            res.json({
                _id: userExists._id,
                email: userExists.email,
                token: generateToken(userExists._id),
            })
        }else{
            res.status(401).json({message: "Invalid Credentials"})
        }
    }catch(err){
        res.status(500).json({message: "Server Error",error:err.message})
    }

};