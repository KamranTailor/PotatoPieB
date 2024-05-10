import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv'; 

const router = express.Router();
dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SP1,
  clientSecret: process.env.SP2,
});

// Middleware to set access token for Spotify API
router.use(async (req, res, next) => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    next();
  } catch (error) {
    console.error('Error setting access token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get artist's albums and information
router.post('/artist/albums', async (req, res) => {
  try {
    const { artistId } = req.body;

    if (!artistId) {
      return res.status(400).json({ error: 'Artist ID is required' });
    }

    // Retrieve the artist's albums with only "album" and "single" types and limit to 10 items
    const artistAlbums = await spotifyApi.getArtistAlbums(artistId, {
      include_groups: 'album',
      limit: 10
    });

    const artistSingles = await spotifyApi.getArtistAlbums(artistId, {
      include_groups: 'single',
      limit: 10
    });

    // Retrieve the artist's information
    const artistInfo = await spotifyApi.getArtist(artistId);

    // Send both the albums and artist information in the response
    res.json({ status: true, albums: artistAlbums.body, artist: artistInfo.body, singles: artistSingles });
  } catch (error) {
    res.status(500).json({status: false, error: 'Incorrect Artist Code' });
  }
});



// Endpoint to get artist's albums from a given URL
router.post('/artist/albums/s', async (req, res) => {
  const { url } = req.body;

  try {
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch data from the provided URL using the access token from spotifyApi object
    const accessToken = spotifyApi.getAccessToken();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    // Send the data in the response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/album', async (req, res) => {
  try {
    const { albumId } = req.body;

    if (!albumId) {
      return res.status(400).json({ error: 'Album ID is required' });
    }

    // Retrieve the album information
    const albumInfo = await spotifyApi.getAlbum(albumId);

    // If you want to get additional information like tracks, you can do so here
    // Example:
    // const albumTracks = await spotifyApi.getAlbumTracks(albumId);

    // Send the album information in the response
    res.json({ album: albumInfo.body });
  } catch (error) {
    console.error('Error getting album information', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to write data to a file
router.post('/POST', async (req, res) => {
  try {
    // Get the data from the request body
    const { data } = req.body;

    // Write the data to the file
    await fsPromises.writeFile('../database/homepage/banner/banner.txt', data, 'utf8');

    res.json({ success: true });
  } catch (error) {
    console.error('Error writing to the file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (request, response) => {
  try {
      const jsonData = await fsPromises.readFile('../database/music/artists.json', 'utf8');
       const data = JSON.parse(jsonData);
      response.json({ data });
  } catch (error) {
      console.error('Error reading the file:', error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;
