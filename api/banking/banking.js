// api/baking/banking.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const router = express.Router();

router.get('/getUsers', async (req, res) => {
    try {

    } catch (error) {
        console.error('Error processing the responce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addUser', async (req, res) => {
    try {

    } catch (error) {
        console.error('Error processing the responce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateUserInfo', async (req, res) => {
    try {

    } catch (error) {
        console.error('Error processing the responce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getTransactions', async (req, res) => {
    try {

    } catch (error) {
        console.error('Error processing the responce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/newTransaction', async (req, res) => {
    try {

    } catch (error) {
        console.error('Error processing the responce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
