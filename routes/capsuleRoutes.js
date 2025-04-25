const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {createCapsule, getAllCapsules, getCapsule} = require("../controllers/capsuleController");
const {protect} = require("../middleware/userMiddleware");

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename:(req, file, callback) =>{
        callback(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post("/",protect, upload.single("attachment"), createCapsule);
router.get("/", protect, getAllCapsules);
router.get("/:id", protect, getCapsule);

module.exports = router;