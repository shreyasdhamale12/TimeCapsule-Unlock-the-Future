const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    title:{
        type:String,
        required: true
    },
    encryptedMessage:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["text", "image", "video"],
        default:"text"
    },
    attachmentUrl:{
        type:String,
    },
    unlockDate:{
        type:Date,
        required:true,
    },
    isUnlocked:{
        type:Boolean,
        required: false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    iv: { 
        type: String,
         required: true
     },
});

module.exports = mongoose.model("Capsule", capsuleSchema);