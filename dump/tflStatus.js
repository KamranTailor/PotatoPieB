// tflStatus.js

import fetch from 'node-fetch';
import fsPromises from '../utils/fsPromises.js'; 
import dotenv from 'dotenv'; 
import { sendWebhookMessage } from '../utils/discord.js';

dotenv.config();

const TFL_API_BASE_URL = 'https://api.tfl.gov.uk/line/mode/';
const DATA_FILE_PATH = '../database/tfl/status.json';
const webhookUrl = `https://discord.com/api/webhooks/${process.env.DSTAUS}`;
const tflKey = process.env.TFL

const fetchTFLData = async (mode, tflKey) => {
    const url = `${TFL_API_BASE_URL}${mode}/status?app_id=${tflKey}`;
    const response = await fetch(url);
    return response.json();
  };
  
const compareStatusSeverity = async (newData, oldData) => {
  console.log(newData)
};
  
const fetchDataAndSave = async () => {
    try {
      const tubeData = await fetchTFLData('tube', tflKey);
      const elizabethData = await fetchTFLData('elizabeth-line', tflKey);
      const dlrData = await fetchTFLData('dlr', tflKey);
      const tramData = await fetchTFLData('tram', tflKey);
      const overgroundData = await fetchTFLData('overground', tflKey);
  
      //const oldData = JSON.parse(await fsPromises.readFile(DATA_FILE_PATH, 'utf8'));
      const result = {
        tubeData,
        elizabethData,
        dlrData,
        tramData,
        overgroundData
      };

      const timestampISO = new Date().toISOString();
      const msg = (`Data Saved to, ${DATA_FILE_PATH}, *${timestampISO}*`);
      const hook = process.env.DTFLDATA
      sendWebhookMessage(hook, msg)

      await fsPromises.writeFile(DATA_FILE_PATH, JSON.stringify(result, null, 2));
  
      
    } catch (error) {
      console.error('Error fetching or saving data:', error);
    }
  };
  
  export { fetchDataAndSave };