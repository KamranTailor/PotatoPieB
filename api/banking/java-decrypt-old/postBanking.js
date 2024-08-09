// api/baking/addUserAPICall.js

import express, { response } from 'express';
import fsPromises from '../../utils/fsPromises.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const router = express.Router();

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY2, 'hex'); // 32 bytes key for AES-256
const IV = Buffer.from(IV2, 'hex'); // 16 bytes IV
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

router.post('/giveTransaction', (req, res) => {
    try {
        // Log the entire request body

        // Check for encrypted data
        if (!req.body.encryptedData) {
            console.log('Error: No encrypted data provided');
            res.status(400).json({ error: 'No encrypted data provided' });
            return;
        }

        const encryptedData = req.body.encryptedData;

        // Decrypt the data
        const decryptedData = decrypt(encryptedData, ENCRYPTION_KEY, IV);

        // Log the decrypted data

        saveTransaction(decryptedData)

        // Send a success response
        res.json(true);
    } catch (error) {
        console.error('Error processing the data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function decrypt(encryptedData, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'base64')), decipher.final()]);
    let string = decrypted.toString();
    return JSON.parse(string);
}

async function saveTransaction(dataToAdd) {
    try {  

        // Read the existing data from the file
        const data = await fsPromises.readFile("../database/banking/transactions.json", 'utf8');
        const dataJSON = JSON.parse(data);

        // Create a new transaction object
        const push = {
            amount: dataToAdd.amount,
            subject: dataToAdd.subject,
            date: new Date(),
            user: dataToAdd.userId,
            transaction_id: uuidv4(),
            transaction_type: dataToAdd.transactionType
        };

        dataJSON.push(push);

        await fsPromises.writeFile("../database/banking/transactions.json", JSON.stringify(dataJSON, null, 2));

        const userData = await fsPromises.readFile("../database/banking/userDataSimple.json", 'utf8');
        const userDataJSON = JSON.parse(userData);

        const transaction_type = push.transaction_type;
        const convertedAmount = Number(push.amount);
        
        for (let i in userDataJSON) {
            if (userDataJSON[i].user_id == push.user) {
                
                userDataJSON[i].loan_ammount = Number(userDataJSON[i].loan_ammount);
                userDataJSON[i].savings_ammount = Number(userDataJSON[i].savings_ammount);

                if (transaction_type === "loan-take") {
                    userDataJSON[i].loan_ammount += convertedAmount;
                } else if (transaction_type === "loan-pay") {
                    userDataJSON[i].loan_ammount -= convertedAmount;
                } else if (transaction_type === "savings-in") {
                    userDataJSON[i].savings_ammount += convertedAmount;
                } else if (transaction_type === "savings-out") {
                    userDataJSON[i].savings_ammount -= convertedAmount;
                }
            }
        }

        await fsPromises.writeFile("../database/banking/userDataSimple.json", JSON.stringify(userDataJSON, null, 2));
    } catch (error) {
        console.error('Error processing the data:', error);
    }
}


export default router;
