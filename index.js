// index.js 

const version = "V010.008.000"

// Import 
import express from 'express';
import dotenv from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
dotenv.config();
const crypto = require('crypto');
const nodeCron = require('node-cron');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
import fetch from 'node-fetch';
import fsPromises from './utils/fsPromises.js'; // Import fsPromises from the local file
import { sendWebhookMessage } from './utils/discord.js';
import { getInternalIP } from './utils/internalIP.js';
import bodyParser from 'body-parser';
import os from 'os';

const port = process.env.PORT || 80;

// Import API routes
import app from './main.js';

//Import DUMP
import './dump/main.js'

//VERSION CONTROL
app.get('/version', (request, response) => {response.json({version: version})});



//Send Server Start Up
const internalIP = getInternalIP();
const hook = process.env.DIP;
const msg = `Listening at port ${port}, *${internalIP}*`; 
sendWebhookMessage(hook, msg)

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));
app.listen(port, () => console.log(`Listening at port ${port}`));
