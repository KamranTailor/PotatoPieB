// main.js

import express from 'express';
import bodyParser from 'body-parser';

//APP APIS
import shopRouter from './app/my-fn/shop.js';
import statsRouter from './app/my-fn/stats.js';
import statusRouter from './app/tube-time/status.js';
import nearbyRouter from './app/tube-time/nearby.js';
import stoppointRouter from './app/tube-time/stoppoint.js';

//WEB APIS
import contactRouter from './api/home/contact.js';
import homeBannerRouter from './api/home/banner.js';
import loginRouter from './api/userVerification/userVerfication.js';
import loginCheckRouter from './api/userVerification/loginCheck.js';

import newsRouter from './api/news/news.js';
import musicRouter from './api/music/artists.js';
import spotifyRouter from './api/music/spotify.js';

import sessionsAdminRouter from './api/admin/sessions.js';
import usersAdminRouter from './api/users/users.js';
import otpAdminRouter from './api/admin/otp.js';
import createUserAdminRouter from './api/users/makeUser.js';
import userActionsAdminRouter from './api/users/userActions.js';
import changePasswordRouter from './api/users/changePassword.js';

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routers
app.use('/app', shopRouter);
app.use('/app', statsRouter);
app.use('/app-tfl', statusRouter);
app.use('/app-tfl', nearbyRouter);
app.use('/app-tfl', stoppointRouter);


app.use('/contact', contactRouter);
app.use('/homepageBanner', homeBannerRouter);
app.use('/userVerfication', loginRouter);
app.use('/ID', loginCheckRouter);

app.use('/news', newsRouter);
app.use('/music_a', musicRouter);
app.use('/spotify', spotifyRouter);

app.use('/sessionsAdmin', sessionsAdminRouter);
app.use('/usersAdmin', usersAdminRouter);
app.use('/otpAdmin', otpAdminRouter);
app.use('/createUserAdminRouter', createUserAdminRouter);
app.use('/userActionsAdmin', userActionsAdminRouter);
app.use('/changePassword', changePasswordRouter);

export default app;
