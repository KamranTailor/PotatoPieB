import express from 'express';
import fetch from 'node-fetch';
import fsPromises from '../utils/fsPromises.js'; // Import fsPromises from the CommonJS module
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { sendWebhookMessage } from '../utils/discord.js';

// Initialize dotenv to load environment variables from .env file
dotenv.config();

// Define the function to fetch Fortnite item shop data
async function fetchFortniteItemShop() {
    try {
        const requestOptions = {
            headers: {
                'x-api-key': process.env.FNBR // Use the API key from environment variables
            }
        };

        // Fetch the item shop data from the Fortnite API
        const response = await fetch("https://fnbr.co/api/shop", requestOptions);
        const data = await response.json();

        let itemShopData = [];

        // Iterate through sections and items to extract item details
        for (const section of data.data.sections) {
            const sectionName = section.displayName;

            for (const itemID of section.items) {
                const response = await fetch(`https://fnbr.co/api/images?search=${itemID}`, requestOptions);
                const itemData = await response.json();

                const { name, id, price, rarity, type } = itemData.data[0];
                const icon = itemData.data[0].images.icon

                if (type !== "lego-outfit") {
                    itemShopData.push({ name, id, icon, sectionName, price, rarity, type });
                }
            }
        }

        // Convert itemShopData to JSON string
        const jsonData = JSON.stringify(itemShopData, null, 2);

        // Define the file path
        const filePath = '../database/fortnite/itemShop.json';

        // Write JSON string to file
        await fsPromises.writeFile(filePath, jsonData, 'utf8');

        const timestampISO = new Date().toISOString();
        const readableTimestamp = new Date(timestampISO).toLocaleString();
        const msg = (`Data has been saved to ${filePath}, *${readableTimestamp}*`);
        console.log(msg)

        const hook = process.env.DITEMSHOP 
        sendWebhookMessage(hook, msg)
    } catch (error) {
        console.error('Error fetching Fortnite item shop data:', error);
        throw error; // Re-throw the error for handling upstream
    }
}

// Export the router and fetchFortniteItemShop function
export { fetchFortniteItemShop };
