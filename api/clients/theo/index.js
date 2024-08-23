// api/clients/theo/get.js

import express from 'express';
import fsPromises from '../../../utils/fsPromises.js';
import SpotifyWebApi from 'spotify-web-api-node';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

async function getDataBase() {
    try {
        const response = await fsPromises.readFile('../database/clients/theo/music.json', 'utf8');
        return JSON.parse(response);
    } catch (error) {
        return null;
    }
}

router.get('/musicRequest', async (request, response) => {
    try {
        const data = await getDataBase();
        response.json(data);
    } catch (error) {
        console.error('Error reading the file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addMusic', async (request, response) => {
    try {
        // Get the data from the request body
        const requestData = request.body;
        const pushData = {
            uuid: uuidv4(),
            artist: requestData.artist,
            name: requestData.name,
            spotifyData: requestData.spotifyData,
            review: requestData.review,
            subtitle: requestData.subtitle,
            rating: requestData.rating,
            createdBy: requestData.createdBy,
            createdAt: new Date().toISOString(),
            comments: []
        }
        
        const data = await getDataBase();

        delete pushData.spotifyData.available_markets;
        data.push(pushData);

        await fsPromises.writeFile('../database/clients/theo/music.json', JSON.stringify(data, null, 2));
        response.json({ success: true });
    } catch (error) {
        console.error('Error writing to the file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteMusic/:uuid', async (request, response) => {
    try {
        const { uuid } = request.params;
        let data = await getDataBase();

        const newData = data.filter(album => album.uuid !== uuid);

        if (newData.length === data.length) {
            return response.status(404).json({ error: 'Album not found' });
        }

        await fsPromises.writeFile('../database/clients/theo/music.json', JSON.stringify(newData, null, 2));
        response.json({ success: true });
    } catch (error) {
        console.error('Error deleting the album:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// New Route: Edit Only the Review Property by UUID
router.patch('/editReview/:uuid', async (request, response) => {
    try {
        const { uuid } = request.params;
        const { review } = request.body;

        let data = await getDataBase();
        let album = data.find(album => album.uuid === uuid);

        if (!album) {
            return response.status(404).json({ error: 'Album not found' });
        }

        album.review = review;

        await fsPromises.writeFile('../database/clients/theo/music.json', JSON.stringify(data, null, 2));
        response.json({ success: true });
    } catch (error) {
        console.error('Error updating the review:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
