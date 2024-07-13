// api/flight/getFlights.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const response = await fetch("http://192.168.0.238/dump1090/data/aircraft.json");
        const data = await response.json();
        response.json({data})
    }catch (error) {
        console.error('Error reading the file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
