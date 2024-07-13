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
        
       
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
}

  
// Export the router and fetchFortniteItemShop function
export { setFlightData() };
