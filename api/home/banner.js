// api/home/banner.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const data = await fsPromises.readFile('../database/homepage/banner/banner.txt', 'utf8');
        response.json({ data: data });
    } catch (error) {
        console.error('Error reading the file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/POST', async (request, response) => {
    try {
        // Get the data from the request body
        const requestData = request.body.data;

        // Write the data to the file
        await fsPromises.writeFile('../database/homepage/banner/banner.txt', requestData, 'utf8');

        response.json({ success: true });
    } catch (error) {
        console.error('Error writing to the file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
