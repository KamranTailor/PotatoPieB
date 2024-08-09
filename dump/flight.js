import express from 'express';
import fetch from 'node-fetch';
import fsPromises from '../utils/fsPromises.js'; // Import fsPromises from the CommonJS module
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { sendWebhookMessage } from '../utils/discord.js';
import { addItemToDatabase } from './utils/addToDatabase.js';

// Initialize dotenv to load environment variables from .env file
dotenv.config();

let flights = [];

// Define the function to fetch Fortnite item shop data
async function fetchDataFlight() {
    try {
        const response = await fetch("http://192.168.0.238/dump1090/data/aircraft.json");
        const data = await response.json();
    
        flights = [];
        for (let i in data.aircraft) {
            if (data.aircraft[i].flight) {
                const aircraftData = {
                    callSign: data.aircraft[i].flight, 
                    squawk: data.aircraft[i].squawk, 
                    altitude: data.aircraft[i].altitude,
                    track: data.aircraft[i].track,
                    timestamp: Date.now(),
                    lat: data.aircraft[i].lat,
                    lon: data.aircraft[i].lon,
                };

                flights.push(aircraftData);
            }
        }

    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
}

function sendFlightData() {
    return flights;
}

  
// Export the router and fetchFortniteItemShop function
export { fetchDataFlight, sendFlightData };
