// api/home/sessions.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (request, response) => {
    if (request.body.authCode == process.env.AUTHCODE1){
        try {
            // Read the JSON file asynchronously
            const jsonData = await fsPromises.readFile('../database/userData/sessions.json', 'utf8');
            
            // Parse the JSON data into a JavaScript object
            const data = JSON.parse(jsonData);
            
            // Respond with the JSON data
            response.json({status: true, data: data});
        } catch (error) {
            console.error('Error reading JSON file:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        response.json({status: false})
    }
});

export default router;

