const express = require('express');
const router = express.Router();

const {encrypt, decrypt} = require('../utils/encryption');

router.post('/encrypt', (req, res) => {
    const {message} = req.body;

    if(!message){
        return res.status(400).json({message:"Message is required"});
    }

    const encryptedMessage = encrypt(message);

    res.json({
        encryptData:encryptedMessage.data,
        iv:encryptedMessage.iv
    });

});


router.post('/decrypt', (req,res) =>{
  
    const {encryptData, iv} = req.body;

    if(!encryptData || !iv){
        return res.status(400).json({message:"Both encryptData and iv are required"});
    }

    try {
        const decryptMessage = decrypt(encryptData, iv);
        res.json({decryptMessage});
    } catch (err) {
        return res.status(500).json({message: "Decryption failed", error:err.message})
    }

});

module.exports = router;