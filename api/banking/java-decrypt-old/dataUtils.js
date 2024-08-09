import crypto from 'crypto';

// Function to pad or truncate the key to ensure it's 32 bytes long
function getKey(secretKey) {
    return crypto.createHash('sha256').update(secretKey).digest();
}

// Function to encrypt data
function encrypt(text, secretKey) {
    const key = getKey(secretKey); // Ensure key is 32 bytes
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Function to decrypt data
function decrypt(text, secretKey) {
    const key = getKey(secretKey); // Ensure key is 32 bytes
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export { encrypt, decrypt };
