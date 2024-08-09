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

// Middleware to validate API key
function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === API_KEY) {
        next(); // API key is valid, proceed to the route handler
    } else {
        res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
}

router.post('/edit', apiKeyMiddleware, async (req, res) => {
    try {
        const data = await fsPromises.readFile("../database/banking/userDataSimple.json", 'utf8');
        const dataJSON = JSON.parse(data);

        console.log(dataJSON)
        // Encrypt the entire JSON data 
        const encryptedData = encrypt(JSON.stringify(dataJSON));

        // Respond with the encrypted data
        res.json(encryptedData);
    } catch (error) {
        console.error('Error processing the data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
