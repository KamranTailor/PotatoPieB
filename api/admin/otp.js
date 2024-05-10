// api/home/otp.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const sessionFilePath = "../database/userData/adminSessions.json"
function generate8DigitNumber() {
    // Generate a random number between 0 and 99999999 (8 digits)
    let randomNumber = Math.floor(Math.random() * 100000000);
    
    // Ensure that the generated number has exactly 8 digits
    // Pad the number with zeros if necessary
    let eightDigitNumber = randomNumber.toString().padStart(8, '0');
    
    return eightDigitNumber;
}

async function saveSession(sessionData) {
    try {
        let sessions = await fsPromises.readFile(sessionFilePath, 'utf8');
        sessions = JSON.parse(sessions);

        // Remove any existing session for the user
        sessions = sessions.filter(session => session.userID !== sessionData.userID);

        // Add the new session
        sessions.push(sessionData);

        // Write the updated sessions back to the file
        await fsPromises.writeFile(sessionFilePath, JSON.stringify(sessions, null, 2));
    } catch (error) {
        console.error(error);
    }
}

router.post('/save', async (request, response) => {
    const sessionData = {
        username: request.body.username,
        userIP: request.ip,
        timestamp: new Date().toISOString()
    };
    sessionData.id = generate8DigitNumber()
    
    if (parseInt(request.body.authCode) === parseInt(process.env.AUTHCODE1)){
        sessionData.outcome = true;
        response.json({sessionData})
    } else {
        sessionData.outcome = false;
        response.json({sessionData})
    }

    saveSession(sessionData)
});


router.post('/check', async (request, response) => {
    
});
export default router;

