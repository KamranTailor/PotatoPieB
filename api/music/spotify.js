// server.js
import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SP1,
  clientSecret: process.env.SP2,
  redirectUri: 'http://localhost/music/spotify/',
});

router.get("/login", (req, res) =>{
    const scopes = ["user-read-private", "user-read-email","user-read-playback-sate","user-modify-playback-state"];
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
})

router.get('callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error("Error", error);
        res.send(`error: ${error}`)
        return;
    }

    spotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body["access_token"];
        const refreshToken = data.body["refresh_token"];
        const expiersIn = data.body["expires_in"];

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        console.log(accessToken, refreshToken)
        res.send("Sucess!"); 

        setInterval(async() => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body["access_token"];
            spotifyApi.setAccessToken(accessTokenRefreshed)
        }, expiersIn/2*1000)
    })
})

export default router;
