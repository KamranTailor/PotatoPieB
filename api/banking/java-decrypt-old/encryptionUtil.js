// utils/encryptionUtil.js
import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; // Ensure this matches the algorithm used in the client
const key = Buffer.from('hiy2i65tUcg14hQzSCTuE4HkmMXXXMHP'); // 32 bytes for AES-256
const iv = Buffer.from('WWjmqf2MT0PSkbTh'); // 16 bytes initialization vector

// Encrypt function
export function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

// Decrypt function
export function decrypt(encryptedText) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
