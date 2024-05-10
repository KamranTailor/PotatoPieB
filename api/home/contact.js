// app/my-fn/shop.js

import express, { request, response } from 'express';
import fsPromises from '../../utils/fsPromises.js';
import { sendWebhookMessage } from '../../utils/discord.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {

        const subject = request.body.subject;
        const email = request.body.email;
        const content = request.body.content;
        const message = `**New Contact Request**
        From: ${email},
        Subject: ${subject},
        Content: ${content}`

        
        const url = process.env.DCONTACT
        sendWebhookMessage(url, message)
        response.json({ status: true})
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
