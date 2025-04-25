const Capsule = require("../models/capsule");
const { encrypt, decrypt } = require("../utils/encryption");
const moment = require('moment-timezone');

const createCapsule = async (req, res) => {
    const { title, message, unlockDate, type } = req.body;
    const attachment = req.file ? req.file.path : null;

    const unlockDateIST = moment(unlockDate).tz('Asia/Kolkata').toDate();

    if (new Date(unlockDateIST) <= new Date()) {
        return res.status(400).json({ message: "Unlock date must be in the future" });
    }

    if (!message) {
        return res.status(400).json({ message: "Message is needed" });
    }

    const encrypted = encrypt(message);

    const capsule = await Capsule.create({
        userId: req.user._id,
        title,
        encryptedMessage: encrypted.data,
        unlockDate: unlockDateIST,
        type,
        createdAt: new Date(),
        isUnlocked: false,
        iv: encrypted.iv,
        attachment,
    });

    res.status(201).json({
        message: "Capsule created",
        capsuleId: capsule._id,
        unlockDate: moment(capsule.unlockDate).tz('Asia/Kolkata').format(),
        attachment: capsule.attachment,
    });
};

const getCapsule = async (req, res) => {
    const capsule = await Capsule.findById(req.params.id);

    if (!capsule) {
        return res.status(404).json({ message: "Capsule not found" });
    }

    if (!capsule.encryptedMessage) {
        return res.status(400).json({ message: "Missing data to decrypt" });
    }

    if (!capsule.iv) {
        return res.status(400).json({ message: "Missing iv to decrypt" });
    }

    const currentTimeIST = moment().tz('Asia/Kolkata');
    const unlockTimeIST = moment(capsule.unlockDate).tz('Asia/Kolkata');

    if (currentTimeIST.isBefore(unlockTimeIST)) {
        return res.status(400).json({ message: "Capsule is locked. Try again later." });
    }

    try {
        const decryptMessage = decrypt(capsule.encryptedMessage, capsule.iv);

        res.json({
            title: capsule.title,
            message: decryptMessage,
            unlockDate: moment(capsule.unlockDate).tz('Asia/Kolkata').format(),
            attachment: capsule.attachment,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to decrypt the message", error: error.message });
    }
};

const getAllCapsules = async (req, res) => {
    const capsules = await Capsule.find({ userId: req.user._id }).select(
      "title unlockDate isUnlocked createdAt"
    );
  
    const capsulesWithIST = capsules.map(capsule => ({
        ...capsule.toObject(),
        createdAt: moment(capsule.createdAt).tz('Asia/Kolkata').format(),
        unlockDate: moment(capsule.unlockDate).tz('Asia/Kolkata').format(),
    }));

    res.json(capsulesWithIST);
};

module.exports = { createCapsule, getCapsule, getAllCapsules };
