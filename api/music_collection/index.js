import express from 'express';
import fetch from 'node-fetch';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import fsPromises from '../../utils/fsPromises.js';

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const client_id = process.env.SP1;
const client_secret = process.env.SP2;

const filePath = "../database/music/collection/collection.json";

let cachedToken = null;
let tokenExpiresAt = null;

async function getAccessToken() {
    if (cachedToken && tokenExpiresAt > Date.now()) {
        return cachedToken;
    }

    const token_url = 'https://accounts.spotify.com/api/token';
    const response = await fetch(token_url, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            grant_type: 'client_credentials'
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 5000; // Buffer before expiry
    return cachedToken;
}

async function searchAlbum(album_name) {
    const token = await getAccessToken();
    const search_url = 'https://api.spotify.com/v1/search';
    const response = await fetch(`${search_url}?${new URLSearchParams({
        q: album_name,
        type: 'album',
        limit: 12
    })}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching album:', errorData);
        throw new Error('Failed to fetch album');
    }

    const data = await response.json();
    const albums = data.albums.items;

    if (albums.length > 0) {
        return data;
    } else {
        return null;
    }
}

router.post('/add', async (request, response) => {
    try {
        const album = await searchAlbum(request.body.name);
        if (album) {
            response.json(album);
        } else {
            response.status(404).json({ error: 'Album not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/confirm', async (request, response) => {
    try {
        const fileData = await fsPromises.readFile(filePath, 'utf8');
        const data = JSON.parse(fileData);

        const push = request.body;
        push.id = uuidv4();
        delete push.albumData.available_markets;
        data.push(push);

        const updatedData = JSON.stringify(data, null, 2); 
        await fsPromises.writeFile(filePath, updatedData, 'utf8');

        response.json(push);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (request, response) => {
    try {
        const fileData = await fsPromises.readFile(filePath, 'utf8');
        const data = JSON.parse(fileData);

        response.json(data);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
