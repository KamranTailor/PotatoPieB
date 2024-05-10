import { fetchFortniteItemShop } from './fortnite.js'; // Import the fetchFortniteItemShop function
import { fetchDataAndSave } from './tflStatus.js';
import cron from 'node-cron';

// Call the function to fetch Fortnite item shop data
async function runFortniteDataUpdate() {
    try {
        await fetchFortniteItemShop();
        console.log('Fortnite item shop data has been updated.');
    } catch (error) {
        console.error('Error updating Fortnite item shop data:', error);
    }
}

// Define the cron job to run at 5 minutes past midnight
const task = cron.schedule('5 0 * * *', () => {
    runFortniteDataUpdate()
}, {
    scheduled: true,
    timezone: "GMT" // Set your timezone here
});

// Start the cron job
task.start();


const interval = 90 * 1000;
setInterval(async () => {
  await fetchDataAndSave();
}, interval);

// Execute the function
runFortniteDataUpdate();
fetchDataAndSave()
