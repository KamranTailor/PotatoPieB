// api/home/news.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const uid = function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

router.get('/get', async (request, response) => {
    try {
        // Read the JSON file asynchronously
        const jsonData = await fsPromises.readFile('../database/news/news.json', 'utf8');
            
        // Parse the JSON data into a JavaScript object
        const data = JSON.parse(jsonData);
            
        // Respond with the JSON data
        response.json({status: true, data: data});
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (request, response) => {
    try {
        // Read the JSON file asynchronously
        const jsonData = await fsPromises.readFile('../database/news/news.json', 'utf8');
        
        // Parse the JSON data into a JavaScript object
        let data = JSON.parse(jsonData);
        
        // Add a timestamp to the data
        const timestamp = new Date().toISOString();
        const ID = uid();
        const newData = { ...request.body, timestamp, ID };
        
        // Append data with timestamp to the parsed JSON object
        data.push(newData);
        
        // Write the updated JSON object back to the file
        await fsPromises.writeFile('../database/news/news.json', JSON.stringify(data, null, 2));
        
        // Respond with the updated JSON data
        response.json({status: true, data: data});
    } catch (error) {
        console.error('Error reading or writing JSON file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

