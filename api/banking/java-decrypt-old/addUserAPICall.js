// api/baking/addUserAPICall.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const router = express.Router();

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Must be 256 bits (32 bytes)
const IV = Buffer.from(process.env.IV, 'hex'); // Must be 128 bits (16 bytes)
const API_KEY = process.env.API_KEY;

if (ENCRYPTION_KEY.length !== 32) {
    throw new Error('Encryption key must be 32 bytes (256 bits) long');
}

if (IV.length !== 16) {
    throw new Error('Initialization vector (IV) must be 16 bytes (128 bits) long');
}

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: IV.toString('hex'), encryptedData: encrypted };
}

// Middleware to validate API key
function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === API_KEY) {
        next(); // API key is valid, proceed to the route handler
    } else {
        res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
}

router.get('/getData', apiKeyMiddleware, async (req, res) => {
    try {
        const data = await fsPromises.readFile("../database/banking/userDataSimple.json", 'utf8');
        const dataJSON = JSON.parse(data);

        // Encrypt the entire JSON data
        const encryptedData = encrypt(JSON.stringify(dataJSON));

        // Respond with the encrypted data
        res.json(encryptedData);
    } catch (error) {
        console.error('Error processing the data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getDataTransactions', apiKeyMiddleware, async (req, res) => {
    try {
        const data = await fsPromises.readFile("../database/banking/transactions.json", 'utf8');
        const dataJSON = JSON.parse(data);

        // Encrypt the entire JSON data
        const encryptedData = encrypt(JSON.stringify(dataJSON));

        // Respond with the encrypted data
        res.json(encryptedData);
    } catch (error) {
        console.error('Error processing the data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getDataUsers', apiKeyMiddleware, async (req, res) => {
    try {
        const data = await fsPromises.readFile("../database/banking/userDataSimple.json", 'utf8');
        const dataJSON = JSON.parse(data);

        let users = [];
        for (let i = 0; i < dataJSON.length; i++) {
            const fullName = dataJSON[i].first_name + ' ' + dataJSON[i].second_name;
            const user_id = dataJSON[i].user_id;
            const user = { fullName, user_id };
            users.push(user);
        }

        // Respond with the encrypted data
        res.json(users);
    } catch (error) {
        console.error('Error processing the data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
