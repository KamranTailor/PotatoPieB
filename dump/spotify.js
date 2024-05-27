// spotify.js

import fetch from 'node-fetch';
import fsPromises from '../utils/fsPromises.js'; 
import dotenv from 'dotenv'; 
import { sendWebhookMessage } from '../utils/discord.js';

dotenv.config();




  
export { fetchDataAndSave };