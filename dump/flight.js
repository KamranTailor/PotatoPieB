import express from 'express';
import fetch from 'node-fetch';
import fsPromises from '../utils/fsPromises.js'; // Import fsPromises from the CommonJS module
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { sendWebhookMessage } from '../utils/discord.js';
import { addItemToDatabase } from './utils/addToDatabase.js';

// Initialize dotenv to load environment variables from .env file
dotenv.config();

// Define the function to fetch Fortnite item shop data
async function fetchDataFlight() {
    try {
        const response = await fetch("http://192.168.0.238/dump1090/data/aircraft.json");
        const data = await response.json();
      
        const OldData = await fsPromises.readFile('../database/flight/hourFlights.json', 'utf-8');
        let database = JSON.parse(OldData);
        let databaseNew = [];
        let newEntries = [];

        for (let i in data.aircraft) {
            if (data.aircraft[i].flight) {
                const aircraftData = {
                    callSign: data.aircraft[i].flight, 
                    timestamp: Date.now(),
                };

                const aircraftDataa = {
                    callSign: data.aircraft[i].flight, 
                    squawk: data.aircraft[i].squawk, 
                    altitude: data.aircraft[i].altitude,
                    lat: data.aircraft[i].lat,
                    lon: data.aircraft[i].lon,
                    timestamp: Date.now(),
                };

                const existingIndex = database.findIndex(entry => entry.callSign === aircraftData.callSign);

                if (existingIndex === -1) {
                    newEntries.push(aircraftDataa);
                }

                databaseNew.push(aircraftData); // Use flight call sign as the key
            }
        }

        let message = "";

        for (let i in newEntries) {
            message += `
            \`\`\` Flight Number: ${newEntries[i].callSign}
            * Squawk: ${newEntries[i].squawk}
            * lat: ${newEntries[i].lat}
            * lon: ${newEntries[i].lon} \`\`\``;
        }

        const hook = process.env.DPI24 
        sendWebhookMessage(hook, message)

        await fsPromises.writeFile('../database/flight/hourFlights.json', JSON.stringify(databaseNew, null, 2));
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
}

  
// Export the router and fetchFortniteItemShop function
export { fetchDataFlight };
