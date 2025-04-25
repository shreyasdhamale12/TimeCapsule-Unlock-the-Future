const crypto = require('crypto');

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET;  
const iv = crypto.randomBytes(16);

const key = crypto.createHash('sha256').update(secretKey).digest();

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);  
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return {
        iv: iv.toString("hex"),  
        data: encrypted,         
    };
};

const decrypt = (encryptedData, ivStr) => {
    if (!encryptedData || !ivStr) {
        throw new Error('Missing encrypted data or IV');
    }

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivStr, "hex"));  
    let decrypted = decipher.update(encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

module.exports = { encrypt, decrypt };
