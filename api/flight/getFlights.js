// api/flight/getFlights.js

import { sendFlightData } from '../../dump/flight.js';


import express from 'express';
import fsPromises from '../../utils/fsPromises.js';

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        //const fetchResponse = await fetch("http://192.168.0.238/dump1090/data/aircraft.json");
        
        // Check if the response is ok (status is in the range 200-299)
        //if (!fetchResponse.ok) {
        //    throw new Error('Network response was not ok');
        //}

        const flights = sendFlightData();

        response.json({ status: true, data: flights });
    } catch (error) {
        console.error('Error reading the file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
