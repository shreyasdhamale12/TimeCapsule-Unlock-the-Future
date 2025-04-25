const cron = require('node-cron');
const Capsule = require('../models/capsule');
const sendMail = require("../utils/sendEmail");
const capsule = require('../models/capsule');
const user = require("../models/userSchema")

cron.schedule("* * * * *", async () => {
    const now = new Date();

    const capsuleToUnlock = await Capsule.find({
        unlockDate: {$lte : now},
        isUnlocked: false,
    }).populate('userId');

    capsuleToUnlock.forEach(async (capsule) => {
        capsule.isUnlocked = true;
        await capsule.save();
        const userEmail = capsule.userId?.email;
        if (userEmail) {
            await sendMail(
                userEmail,
                "🎉 Your Capsule is Unlocked!",
                `Hey! Your capsule titled "${capsule.title}" has just been unlocked! You can now view its contents.`
            );
        };
    }); 
});
